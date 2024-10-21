import IntSideMenu from './int-side-menu.tsx';
import UserMenu from './user-menu.tsx';

function IntSidebar() {
  return (
    <div className="flex flex-col  justify-between  px-4 py-8 gap-4 bg-light-15 shadow">
      <IntSideMenu />
      <UserMenu />
    </div>
  );
}

export default IntSidebar;
