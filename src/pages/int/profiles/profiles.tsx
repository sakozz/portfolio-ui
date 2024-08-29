import { Outlet } from 'react-router-dom';
import NavMenuBar from '../../public/nav-menu/nav-menu-bar.tsx';

export default function Profiles() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center justify-between py-4 mb-4">
        <h2 className="text-2xl">Profiles</h2>
        <NavMenuBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
