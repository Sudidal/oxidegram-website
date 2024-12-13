import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import PropTypes from "prop-types";
import FullSizeBtn from "../fullSizeBtn/fullSizeBtn.jsx";
import themeManager from "../../utils/themeManager.js";
import classes from "./dialog.module.css";

function Dialog({ callback }) {
  const [openState, setOpenState] = useState(false);
  const profile = useContext(profileContext);
  const ref = useRef(null);
  const nav = useNavigate();

  callback({
    open: open,
    close: close,
  });

  function open(pos) {
    setOpenState(true);
    ref.current.style.left = pos.x + "px";
    ref.current.style.top = pos.y + "px";
    document.body.addEventListener("mousedown", click);
  }

  function close() {
    setOpenState(false);
    document.body.removeEventListener("mousedown", click);
  }

  function click(ev) {
    ev.stopPropagation();
    if (ev.currentTarget === document.body) close();
  }

  if (openState) {
    if (ref.current) ref.current.show();
  } else {
    if (ref.current) ref.current.close();
  }

  return (
    <dialog className={classes.dialog} ref={ref} onMouseDown={click}>
      <FullSizeBtn
        text={"Saved"}
        iconUrl={"/icons/save.svg"}
        onClick={() => {
          nav(`/profiles/${profile.id}/SAVED`);
        }}
      />
      <FullSizeBtn
        text={"Switch appearance"}
        iconUrl={"/icons/crescent.svg"}
        onClick={() => {
          themeManager.switch();
        }}
      />
      <FullSizeBtn
        text={"Log out"}
        onClick={() => {
          profile.logout()
        }}
      />
    </dialog>
  );
}

Dialog.propTypes = {
  callback: PropTypes.func,
};

export default Dialog;
