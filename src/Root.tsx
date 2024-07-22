import { Outlet } from "react-router-dom";
import Sidebar from "./components/side-nav/sidebar.tsx";

function RootLayout() {
  return (
    <>
      <Sidebar />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
