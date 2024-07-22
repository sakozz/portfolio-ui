import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar.tsx";

function RootLayout() {
  return (
    <div className="flex flex-row h-full">
      <Sidebar />
      <main className="flex flex-col flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
