import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";

export const Modal = forwardRef(function ({ children, buttonCaption }, ref) {
  const dialog = useRef();

  // Exposing method to outside components
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});
