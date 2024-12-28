import { useContext } from "react";
import PropTypes from "prop-types";
import modalContext from "../../contexts/modalContext.js";
import PostView from "../postView/postView.jsx";
import PostThumbnail from "../postThumbnail/postThumbnail.jsx";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import InlineImageText from "../inlineImageText/inlineImageText.jsx";
import classes from "./postOverview.module.css";

function PostOverview({ post }) {
  const modal = useContext(modalContext);

  return (
    <div
      className={classes.container}
      onClick={() => {
        modal.open(<PostView post={post} />);
      }}
    >
      <div className={classes.overlay}></div>
      <PostThumbnail post={post} />
      <div className={classes.info}>
        <div>
          <InlineImageText path={"/icons/heart-filled.svg"} text={post._count.likers} />
        </div>
        <div>
          <InlineImageText path={"/icons/comment-filled.svg"} text={post._count.comments} />
        </div>
      </div>
    </div>
  );
}

PostOverview.propTypes = {
  post: PropTypes.object,
};

export default PostOverview;
