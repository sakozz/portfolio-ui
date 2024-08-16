import LogoutBtn from "../../../components/logout.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";
import UserAvatar from "../../../components/user-avatar.tsx";

export default function UserMenu() {
  const { currentUser } = useSelector((state: RootState) => state.session);
  return (
    <div>
      {currentUser?.id && (
        <UserAvatar
          name={currentUser?.firstName}
          avatarUrl={currentUser.avatarUrl}
        />
      )}
      <LogoutBtn />
    </div>
  );
}
