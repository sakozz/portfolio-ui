import { NavLink, Outlet } from "react-router-dom";

export default function Blogs() {
  return (
    <div>
      <div className="blogs flex flex-row justify-between">

      <h2 className="text-3xl">Blogs </h2>
      <NavLink to="new">
        <button type="button" className="btn btn-rounded btn-default">New Blog</button>
      </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
