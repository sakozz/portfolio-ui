import ProfileTabs from './profile-tabs.tsx';
import Experiences from './experiences/experiences.tsx';
import QuickInfo from '../quick-info.tsx';
import Profile from '../../../dao/users.dao.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import ModalContextProvider from '../../../components/modal/modal-context.tsx';
import CompetenceGroups from './competene-groups/competence-groups.tsx';
import { motion } from 'framer-motion';
import Projects from './projects/projects.tsx';
import ScrollSpy from '../../../components/scroll-spy.tsx';
import EducationList from './education/education-list.tsx';

export default function ProfileOverview() {
  const { currentProfile }: { currentProfile: Profile } = useSelector(
    (state: RootState) => state.profile,
  );

  return (
    <div>
      {currentProfile?.id && (
        <ScrollSpy offset={600}>
          <div className="flex flex-col items-center justify-center gap-8">
            <QuickInfo profile={currentProfile} />
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.1, duration: 1, type: 'spring' }}
              viewport={{ once: true, amount: 0.2 }}
              className="sticky top-0 w-full z-10">
              <ProfileTabs />
            </motion.div>
            <ModalContextProvider>
              <CompetenceGroups profile={currentProfile} />
            </ModalContextProvider>
            <ModalContextProvider>
              <Projects profile={currentProfile} />
            </ModalContextProvider>
            <ModalContextProvider>
              <Experiences user={currentProfile} />
            </ModalContextProvider>
            <ModalContextProvider>
              <EducationList profile={currentProfile}></EducationList>
            </ModalContextProvider>
          </div>
        </ScrollSpy>
      )}
    </div>
  );
}
