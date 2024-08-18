import { createPortal } from "react-dom";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { ModalContext } from "./modal-context.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({
  children,
  classname,
}: {
  children: ReactNode;
  classname?: string;
}) {
  const dialog = useRef();
  const { isOpen, closeModal } = useContext(ModalContext);
  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (isOpen) {
      modal.showModal();
      modal.addEventListener("close", () => {
        closeModal();
      });
    }
    return () => modal.close();
  }, [isOpen]);

  return isOpen ? (
    createPortal(
      <dialog ref={dialog} className={`modal ${classname}`}>
        <button
          type="button"
          className={"btn btn-rounded icon-btn absolute end-2 top-2"}
          onClick={closeModal}
        >
          <FontAwesomeIcon icon="xmark" size={"lg"} />
        </button>
        <div className={`content`}>{children}</div>
      </dialog>,
      document.getElementById("modal"),
    )
  ) : (
    <></>
  );
}
