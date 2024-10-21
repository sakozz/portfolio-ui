import ProfileOverview from '../shared/profile/profile-overview.tsx';
import NavMenuBar from '../shared/nav-menu/nav-menu-bar.tsx';

export default function Profile() {
  return (
    <div className="container mx-6 sm:mx-auto ">
      <div className="flex flex-row items-center justify-between py-4 mb-4">
        <NavMenuBar />
      </div>
      <div>
        <ProfileOverview></ProfileOverview>
      </div>
    </div>
  );
}
