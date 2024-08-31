import { RootState } from '../../../store/store.ts';
import LogoutBtn from '../../../components/logout.tsx';
import { useSelector } from 'react-redux';

function NavMenuBar() {
  const { currentProfile, authenticated } = useSelector((state: RootState) => state.session);
  return (
    <>
      {authenticated && (
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <div className="flex flex-col items-start">
            <h4 className="text-lg capitalize">{`${currentProfile?.firstName} ${currentProfile?.lastName}`}</h4>
            <p className="text-xs text-primary-500">Profile</p>
          </div>
          <LogoutBtn />
        </div>
      )}
    </>
  );
}

export default NavMenuBar;
