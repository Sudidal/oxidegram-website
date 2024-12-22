import { useState, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./alert.module.css";

function Alert({ callback }) {
  const [msg, setMsg] = useState(false);
  const curTimer = useRef(null);
  const graphicRef = useRef(null);
  const duration = 4000; //ms

  callback({
    show: show,
    hide: hide,
  });

  function show(input) {
    if (typeof input === "object" || input === "") return;

    setMsg(input);
    clearTimeout(curTimer.current);
    curTimer.current = setTimer();
    resetPositionAndShow();
  }

  function hide() {
    // So hide() won't be called twice if timer is still
    clearTimeout(curTimer.current);
    graphicRef.current.classList.remove(classes.show);
  }

  function setTimer() {
    return setTimeout(() => {
      hide();
    }, duration);
  }

  function resetPositionAndShow() {
    graphicRef.current.style = "transition: none; transform: translateY(0);";
    setTimeout(() => {
      graphicRef.current.style = "";
      graphicRef.current.classList.add(classes.show);
    }, 100);
  }

  return (
    <div ref={graphicRef} className={classes.container}>
      <p>{msg}</p>
    </div>
  );
}

Alert.propTypes = {
  callback: PropTypes.func,
};

export default Alert;
