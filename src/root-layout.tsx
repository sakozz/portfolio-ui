import { useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ToastMessages from "./components/toast-messages/toast-messages.tsx";
import { LoadSession } from "./dao/session.dao.ts";
import { sessionActions } from "./store/session.store.ts";

function RootLayout() {
  const dispatch = useDispatch();
  const isFetching = useIsFetching();

  useEffect(() => {
    LoadSession()
      .then((res) => {
        dispatch(sessionActions.setSession(res));
      })
      .catch((err) => {
        console.log("Error loading session:", err);
      });
  }, [dispatch]);

  return (
    <div className="flex flex-row h-full">
      {isFetching > 0 && (
        <div className="absolute top-0 h-1 w-full progress-bar"></div>
      )}
      <div id={"modal"}></div>
      <ToastMessages></ToastMessages>
      <main className="flex flex-col flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
