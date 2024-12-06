import PropTypes from "prop-types";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import classes from "./postActions.module.css";

function PostActions({ onLike, onComment, onShare, onSave }) {
  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <SvgFileToInline path={"/icons/heart.svg"} />
        <SvgFileToInline path={"/icons/comment.svg"} />
        <SvgFileToInline path={"/icons/share.svg"} />
      </div>
      <div className={classes.rightSide}>
        <SvgFileToInline path={"/icons/save.svg"} />
      </div>
    </div>
  );
}

PostActions.propTypes = {
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onShare: PropTypes.func,
  onSave: PropTypes.func,
};

export default PostActions;
