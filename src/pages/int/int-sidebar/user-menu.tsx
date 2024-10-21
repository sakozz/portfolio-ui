import LogoutBtn from '../../../components/logout.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import UserAvatar from '../../../components/user-avatar.tsx';

export default function UserMenu() {
  const { currentProfile } = useSelector((state: RootState) => state.session);
  return (
    <div>
      {currentProfile?.id && (
        <UserAvatar name={currentProfile?.firstName} avatarUrl={currentProfile.avatarUrl} />
      )}
      <LogoutBtn />
    </div>
  );
}
