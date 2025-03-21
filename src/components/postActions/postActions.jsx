import PropTypes from "prop-types";
import { useState, useContext } from "react";
import modalContext from "../../contexts/modalContext.js";
import alertContext from "../../contexts/alertContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import PostView from "../postView/postView.jsx";
import ShareMenu from "../shareMenu/shareMenu.jsx";
import api from "../../../api.js";
import classes from "./postActions.module.css";

function PostActions({ post, onChange = () => {} }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const modal = useContext(modalContext);
  const alert = useContext(alertContext);

  function like() {
    updateLikeVisual(!liked);
    if (liked) {
      api.unlikePost(post.id).then((res) => {
        if (!res.ok) {
          alert.show(res.msg);
          updateLikeVisual(true);
        }
      });
    } else {
      api.likePost(post.id).then((res) => {
        if (!res.ok) {
          alert.show(res.msg);
          updateLikeVisual(false);
        }
      });
    }
  }

  function comment() {
    modal.open(<PostView post={post} />);
  }
  function share() {
    modal.open(<ShareMenu post={post} />);
  }
  function save() {
    updateSaveVisual(!saved);
    if (saved) {
      api.unsave(post.id).then((res) => {
        if (!res.ok) {
          alert.show(res.msg);
          updateSaveVisual(true)
        }
      });
    } else {
      api.save(post.id).then((res) => {
        if (!res.ok) {
          alert.show(res.msg);
          updateSaveVisual(false)
        }
      });
    }
  }

  function updateLikeVisual(state) {
    setLiked(state);
    if (state) onChange("like");
    else onChange("unlike");
  }
  function updateSaveVisual(state) {
    setSaved(state);
  }

  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <button
          className={`icon-btn ${liked ? classes.liked : ""}`}
          onClick={like}
        >
          <SvgFileToInline
            path={`/icons/${liked ? "heart-filled" : "heart"}.svg`}
          />
        </button>
        <button className="icon-btn" onClick={comment}>
          <SvgFileToInline path={"/icons/comment.svg"} />
        </button>
        <button className="icon-btn" onClick={share}>
          <SvgFileToInline path={"/icons/share.svg"} />
        </button>
      </div>
      <div className={classes.rightSide}>
        <button className="icon-btn" onClick={save}>
          <SvgFileToInline path={`/icons/${saved ? "saved" : "save"}.svg`} />
        </button>
      </div>
    </div>
  );
}

PostActions.propTypes = {
  post: PropTypes.object,
  onChange: PropTypes.func,
};

export default PostActions;
