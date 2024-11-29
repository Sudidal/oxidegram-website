import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import PropTypes from "prop-types";
import classes from "./fullSizeBtn.module.css";

function FullSizeBtn({ iconUrl, text, onClick, icon }) {
  return (
    <button
      className={`unstyled-btn ${classes.btn}`}
      onClick={onClick}
    >
      {icon? icon : <SvgFileToInline path={iconUrl} />}
      <p>{text}</p>
    </button>
  );
}

FullSizeBtn.propTypes = {
  iconUrl: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.element
};

export default FullSizeBtn;
