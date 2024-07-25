import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar.tsx";
import { LoadSession } from "./dao/session.dao.ts";

function RootLayout() {
  useEffect(() => {
    LoadSession().then((user) => {
      console.log(user);
    });
  }, []);
  return (
    <div className="flex flex-row h-full">
      <Sidebar />
      <main className="flex flex-col flex-grow p-4 container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
