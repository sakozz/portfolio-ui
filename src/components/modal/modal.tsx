import { createPortal } from "react-dom";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { ModalContext } from "./modal-context.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

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
      return;
    }
    return () => modal.close();
  }, [isOpen, closeModal]);

  return createPortal(
    <motion.dialog
      variants={{
        hidden: { opacity: 0, x: "-100%" },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.6, type: "spring" }}
      ref={dialog}
      className={`modal ${classname}`}
    >
      <button
        type="button"
        className={"btn btn-rounded icon-btn absolute end-2 top-2"}
        onClick={closeModal}
      >
        <FontAwesomeIcon icon="xmark" size={"lg"} />
      </button>
      <div className={`content`}>{children}</div>
    </motion.dialog>,
    document.getElementById("modal"),
  );
}
