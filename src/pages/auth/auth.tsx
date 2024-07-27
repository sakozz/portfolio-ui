import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toast } from "../../components/toast-messages/toast-messages.tsx";
import { RootState } from "../../store/store.ts";
import { uiActions } from "../../store/ui.store.ts";

export default function Auth() {
  const { authenticated } = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authenticated) {
      dispatch(
        uiActions.addToast({
          toast: new Toast("Welcome !", "Logged in Successfully.", "success"),
        }),
      );
    }
  }, [authenticated]);
  return (
    <div>
      <h2>Auth</h2>
      <Outlet />
    </div>
  );
}
