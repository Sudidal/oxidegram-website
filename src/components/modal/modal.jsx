import { useState, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./modal.module.css";

function Modal({ callback }) {
  const [content, setContent] = useState(null);
  const dialogRef = useRef(null);
  const [openState, setOpenState] = useState(false);

  callback({
    open: open,
    close: close,
  });

  function open(inputCont) {
    setContent(inputCont);
    setOpenState(true);
  }
  function close() {
    setOpenState(false);
  }

  if (openState) {
    if (dialogRef.current) dialogRef.current.showModal();
  } else {
    if (dialogRef.current) dialogRef.current.close();
  }

  return (
    <dialog
      className={classes.dialog}
      ref={dialogRef}
      onClick={(ev) => {
        if (ev.target === dialogRef.current) {
          close();
        }
      }}
    >
      {openState && content}
    </dialog>
  );
}

Modal.propTypes = {
  callback: PropTypes.func,
};

export default Modal;
