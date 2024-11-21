import { useState, useRef } from "react";
import PropTypes from "prop-types";
import CreatePost from "../createPost/createPost.jsx";
import classes from "./modal.module.css";

function Modal({ callback }) {
  const dialogRef = useRef(null);
  const [openState, setOpenState] = useState(false);

  if (dialogRef.current && !callback.open) {
    callback({
      open: () => {
        open();
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

  function open() {
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
      {openState && <CreatePost closeModal={close} />}
    </dialog>
  );
}

Modal.propTypes = {
  callback: PropTypes.func,
};

export default Modal;
