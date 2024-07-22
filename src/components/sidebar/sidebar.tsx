import NavMenu from "./nav-menu.tsx";
import avatarImage from "../../../public/avatar.jpeg";

function Sidebar() {
  const name: string = "John Doe";
  return (
    <div className="flex flex-col items-center min-w-60 bg-orange-600 px-4 py-8 gap-4">
      <img src={avatarImage} alt="avatar image" className="w-32 rounded-full" />
      <h2 className="text-3xl">{name}</h2>
      <NavMenu />
    </div>
  );
}

export default Sidebar;
