import { useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ToastMessages from "./components/toast-messages/toast-messages.tsx";
import Sidebar from "./components/sidebar/sidebar.tsx";
import { loadCookie, LoadSession } from "./dao/session.dao.ts";
import { sessionActions } from "./store/session.store.ts";
import { RootState } from "./store/store.ts";

function RootLayout() {
  const dispatch = useDispatch();
  const { cookie } = useSelector((state: RootState) => state.session);
  const isFetching = useIsFetching();

  useEffect(() => {
    loadCookie();
  }, []);

  useEffect(() => {
    if (cookie) {
      LoadSession()
        .then((res) => {
          dispatch(sessionActions.setSession(res));
        })
        .catch((err) => {
          console.log("Error loading session:", err);
        });
    }
  }, [cookie, dispatch]);

  return (
    <div className="flex flex-row h-full">
      {isFetching > 0 && (
        <div className="absolute top-0 h-1 w-full progress-bar"></div>
      )}
      <ToastMessages></ToastMessages>
      <Sidebar />
      <main className="flex flex-col flex-grow p-4 container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
