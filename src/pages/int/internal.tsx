import { Outlet } from "react-router-dom";
import IntSidebar from "./int-sidebar/int-sidebar.tsx";

export default function Internal() {
  return (
    <div className="flex flex-row full-height flex-grow">
      {/*<IntSidebar />*/}
      <div className={"container mx-auto p-6"}>
        <Outlet />
      </div>
    </div>
  );
}
