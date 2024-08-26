import ProfileTabs from '../../shared/profile/profile-tabs.tsx';
import EducationInfo from '../../shared/profile/education-info.tsx';
import Experiences from '../../shared/profile/experiences/experiences.tsx';
import QuickInfo from '../../shared/quick-info.tsx';
import User from '../../../dao/users.dao.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import ModalContextProvider from '../../../components/modal/modal-context.tsx';
import CompetenceGroups from '../../shared/profile/competene-groups/competence-groups.tsx';
import { motion } from 'framer-motion';

export default function ProfileOverview() {
  const { currentUser }: { currentUser: User } = useSelector((state: RootState) => state.session);
  return (
    <>
      {currentUser?.id && (
        <div className="flex flex-col items-center justify-center gap-8">
          <QuickInfo user={currentUser} />
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1, duration: 1, type: 'spring' }}
            viewport={{ once: true, amount: 0.2 }}
            className="sticky top-0 bg-opacity-95 w-full flex justify-center container bg-white py-8">
            <ProfileTabs />
          </motion.div>
          <ModalContextProvider>
            <CompetenceGroups user={currentUser} />
          </ModalContextProvider>
          <ModalContextProvider>
            <Experiences user={currentUser} />
          </ModalContextProvider>
          <EducationInfo></EducationInfo>
        </div>
      )}
    </>
  );
}
