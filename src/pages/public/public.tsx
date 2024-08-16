import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar.tsx";

export default function PublicPages() {
  return (
    <div className="flex flex-row h-full">
      <Sidebar />
      <main className="flex flex-col flex-grow p-4 container mx-auto">
        <h1>Public Pages</h1>
        <Outlet />
      </main>
    </div>
  );
}
