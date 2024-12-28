import PropTypes from "prop-types";
import { useState, useContext } from "react";
import modalContext from "../../contexts/modalContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import PostView from "../postView/postView.jsx";
import ShareMenu from "../shareMenu/shareMenu.jsx";
import api from "../../../api.js";
import classes from "./postActions.module.css";

function PostActions({ post, onChange = () => {} }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const modal = useContext(modalContext);

  function like() {
    if (liked) {
      onChange("unlike");
      api.unlikePost(post.id);
    } else {
      onChange("like");
      api.likePost(post.id);
    }
    setLiked(!liked);
  }

  function comment() {
    modal.open(<PostView post={post} />);
  }
  function share() {
    modal.open(<ShareMenu post={post} />);
  }
  function save() {
    if (saved) {
      setSaved(false);
      api.unsave(post.id);
    } else {
      setSaved(true);
      api.save(post.id);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <div onClick={like} className={liked ? classes.liked : ""}>
          <SvgFileToInline path={`/icons/${liked ? "heart-filled" : "heart"}.svg`} />
        </div>
        <div onClick={comment}>
          <SvgFileToInline path={"/icons/comment.svg"} />
        </div>
        <div onClick={share}>
          <SvgFileToInline path={"/icons/share.svg"} />
        </div>
      </div>
      <div className={classes.rightSide}>
        <div onClick={save}>
          <SvgFileToInline path={`/icons/${saved ? "saved" : "save"}.svg`} />
        </div>
      </div>
    </div>
  );
}

PostActions.propTypes = {
  post: PropTypes.object,
  onChange: PropTypes.func,
};

export default PostActions;
