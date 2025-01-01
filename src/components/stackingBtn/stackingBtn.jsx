import PropTypes from "prop-types";
import classes from "./stackingBtn.module.css";

function StackingBtn({ content, onClick, danger = false }) {
  return (
    <button
      className={`unstyled-btn ${classes.btn} ${danger ? "danger" : ""}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

StackingBtn.propTypes = {
  content: PropTypes.any,
  onClick: PropTypes.func,
  danger: PropTypes.bool,
};

export default StackingBtn;
