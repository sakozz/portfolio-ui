import ProfileTabs from "../../shared/profile/profile-tabs.tsx";
import EducationInfo from "../../shared/profile/education-info.tsx";
import Experiences from "../../shared/profile/experiences/experiences.tsx";
import QuickInfo from "../../shared/quick-info.tsx";
import User from "../../../dao/users.dao.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";
import ModalContextProvider from "../../../components/modal/modal-context.tsx";

export default function ProfileOverview() {
  const { currentUser }: { currentUser: User } = useSelector(
    (state: RootState) => state.session,
  );
  return (
    <>
      {currentUser?.id && (
        <div className="flex flex-col items-start justify-center gap-8">
          <QuickInfo user={currentUser} />
          <ProfileTabs />
          <ModalContextProvider>
            <Experiences user={currentUser} />
            <EducationInfo></EducationInfo>
          </ModalContextProvider>
        </div>
      )}
    </>
  );
}
