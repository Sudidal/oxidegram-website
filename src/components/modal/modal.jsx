import { useState, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./modal.module.css";

function Modal({ callback }) {
  const [content, setContent] = useState(null)
  const dialogRef = useRef(null);
  const [openState, setOpenState] = useState(false);

  if (dialogRef.current && !callback.open) {
    callback({
      open: (inputCont) => {
        open(inputCont);
      },
      close: () => {
        close();
      },
    });
  }

  if (openState) {
    if (dialogRef.current) dialogRef.current.showModal();
  } else {
    if (dialogRef.current) dialogRef.current.close();
  }

  function open(inputCont) {
    setContent(inputCont)
    setOpenState(true);
  }
  function close() {
    setOpenState(false);
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
