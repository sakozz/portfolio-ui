import ProfileTabs from '../../shared/profile/profile-tabs.tsx';
import EducationInfo from '../../shared/profile/education-info.tsx';
import Experiences from '../../shared/profile/experiences/experiences.tsx';
import QuickInfo from '../../shared/quick-info.tsx';
import Profile from '../../../dao/users.dao.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import ModalContextProvider from '../../../components/modal/modal-context.tsx';
import CompetenceGroups from '../../shared/profile/competene-groups/competence-groups.tsx';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { profileSections } from '../../../lib/constants.ts';
import { uiActions } from '../../../store/ui.store.ts';

export default function ProfileOverview() {
  const { currentProfile }: { currentProfile: Profile } = useSelector(
    (state: RootState) => state.session,
  );
  const dispatch = useDispatch();
  const { el, scroll } = useSelector((state: RootState) => state.ui.inViewElement) || {
    el: profileSections[0].key,
  };

  const containerRef = useRef(null);
  useEffect(() => {
    const element = document.getElementById(el);
    if (element && scroll) {
      element.scrollIntoView({ block: 'center', behavior: 'smooth' });
      dispatch(uiActions.setInViewElement({ el: el, scroll: false }));
    }
  }, [dispatch, el, scroll]);

  return (
    <div>
      {currentProfile?.id && (
        <div ref={containerRef} className="flex flex-col items-center justify-center gap-8">
          <QuickInfo user={currentProfile} />
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1, duration: 1, type: 'spring' }}
            viewport={{ once: true, amount: 0.2 }}
            className=" sticky top-0 bg-opacity-95 w-full flex justify-center container bg-white pt-6 pb-2">
            <ProfileTabs />
          </motion.div>
          <ModalContextProvider>
            <CompetenceGroups user={currentProfile} />
          </ModalContextProvider>
          <ModalContextProvider>
            <Experiences user={currentProfile} />
          </ModalContextProvider>
          <EducationInfo></EducationInfo>
        </div>
      )}
    </div>
  );
}
