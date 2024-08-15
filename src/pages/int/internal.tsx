import { Outlet } from "react-router-dom";

export default function Internal() {
  return (
    <div className="blogs flex flex-col">
      <h2 className="text-3xl">Internal </h2>
      <Outlet />
    </div>
  );
}
