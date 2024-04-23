import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

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
    <dialog ref={dialog}>
      {children}
      <form method="dialog">
        <button>{buttonCaption}</button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});
