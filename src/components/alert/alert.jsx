import { useState, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./alert.module.css";

function Alert({ callback }) {
  const [msg, setMsg] = useState("");
  const [curTimer, setCurTimer] = useState(null);
  const graphicRef = useRef(null);
  const duration = 4000;

  callback({
    show: show,
    hide: hide,
  });

  function show(msg) {
    if (typeof msg === "object" || msg === "") return;
    setMsg(msg);
    clearTimeout(curTimer);
    setCurTimer(setTimer());
    graphicRef.current.classList.add(classes.show);
  }
  function hide() {
    // So hide() won't be called twice if timer is still
    clearTimeout(curTimer);
    graphicRef.current.classList.remove(classes.show);
  }

  function setTimer() {
    return setTimeout(() => {
      hide();
    }, duration);
  }

  return (
    <div ref={graphicRef} className={classes.container}>
      <p>{msg}</p>
    </div>
  );
}

Alert.propTypes = {
  msg: PropTypes.string,
  callback: PropTypes.func,
};

export default Alert;
