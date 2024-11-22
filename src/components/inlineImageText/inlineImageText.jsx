import PropTypes from "prop-types";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import classes from "./inlineImageText.module.css"

function InlineImageText({path, text}) {
  return (
    <div className={classes.container}>
      <SvgFileToInline path={path} />
      <p className={classes.text}>{text}</p>
    </div>
  )
}

InlineImageText.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string
}

export default InlineImageText