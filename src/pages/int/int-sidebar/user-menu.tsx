import LogoutBtn from "../../../components/logout.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";
import UserAvatar from "../../../components/user-avatar.tsx";

export default function UserMenu() {
  const { currentUser } = useSelector((state: RootState) => state.session);
  return (
    <div>
      <h2>{currentUser?.username}</h2>
      <UserAvatar
        name="Sunil"
        avatarUrl="https://lh3.googleusercontent.com/-VHfKLCNcuo8/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfklAe-jgjXsbJspRb1oH3EVJp9r1Yw/photo.jpg?sz=46"
      />
      <LogoutBtn />
    </div>
  );
}
