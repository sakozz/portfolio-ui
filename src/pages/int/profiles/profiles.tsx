import { Outlet } from "react-router-dom";

export default function Profiles() {
  return (
    <div>
      <h2>Profiles</h2>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
