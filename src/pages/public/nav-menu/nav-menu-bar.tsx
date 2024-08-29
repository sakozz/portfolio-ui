import { RootState } from '../../../store/store.ts';
import LogoutBtn from '../../../components/logout.tsx';
import { useSelector } from 'react-redux';

function NavMenuBar() {
  const { currentUser } = useSelector((state: RootState) => state.session);

  return (
    <>
      {currentUser?.id && (
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <div className="flex flex-col items-start">
            <h4 className="text-lg capitalize">{`${currentUser?.firstName} ${currentUser?.lastName}`}</h4>
            <p className="text-xs text-primary-500">Profile</p>
          </div>
          <LogoutBtn />
        </div>
      )}
    </>
  );
}

export default NavMenuBar;
