import { useContext } from "react";
import PropTypes from "prop-types";
import modalContext from "../../contexts/modalContext.js";
import StackingBtn from "../stackingBtn/stackingBtn.jsx";
import classes from "./confirmPopup.module.css";

function ConfirmPopup({
  title = "Are you sure",
  para,
  actionTitle = "Confirm",
  action,
}) {
  const modal = useContext(modalContext);

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <span className="huge-text">{title}?</span>
        <p className="secon-text">{para}?</p>
      </div>
      <StackingBtn content={actionTitle} onClick={action} danger={true} />
      <StackingBtn content={"Cancel"} onClick={modal.close} />
    </div>
  );
}

ConfirmPopup.propTypes = {
  title: PropTypes.string,
  para: PropTypes.string,
  actionTitle: PropTypes.string,
  action: PropTypes.func,
};

export default ConfirmPopup;
