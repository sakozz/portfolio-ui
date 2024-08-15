import { Outlet } from "react-router-dom";

export default function Blogs() {
  return (
    <div className="blogs flex flex-col">
      <h2 className="text-3xl">Blogs </h2>
      <Outlet />
    </div>
  );
}
