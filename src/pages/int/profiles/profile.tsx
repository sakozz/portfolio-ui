import ProfileOverview from '../overview/profile-overview.tsx';
import NavMenuBar from '../../public/nav-menu/nav-menu-bar.tsx';

export default function Profile() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center justify-between py-4 mb-4">
        <NavMenuBar />
      </div>
      <div>
        <ProfileOverview></ProfileOverview>
      </div>
    </div>
  );
}
