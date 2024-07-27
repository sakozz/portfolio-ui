import {  useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { randomId } from "../../utils/misc.ts";
import ToastMessage from "./toast-message.tsx";

export type ToastType = "info" | "success" | "warning" | "error";

export class Toast {
  id: string;
  title: string;
  message?: string | string[] | unknown;
  timeCreated?: Date;
  type: ToastType;

  constructor(
    title: string,
    message: string | string[] | unknown,
    type: ToastType,
  ) {
    this.id = randomId();
    this.title = title;
    this.message = message;
    this.type = type;
    this.timeCreated = new Date();
  }
}

export default function ToastMessages() {
  const toasts: Toast[] = useSelector(
    (state: RootState) => state.ui.toastMessages,
  );

  return (
    <div className="flash-message  p-4 fixed z-50 bottom-4 end-4 gap-y-2 flex flex-col">
      {toasts.map((toast) => (
        <ToastMessage toast={toast} key={toast.id} />
      ))}
    </div>
  );
}
