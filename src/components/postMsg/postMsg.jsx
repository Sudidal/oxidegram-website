import { useState, useEffect, useContext } from "react";
import modalContext from "../../contexts/modalContext.js";
import PropTypes from "prop-types";
import PostThumbnail from "../postThumbnail/postThumbnail.jsx";
import api from "../../../api.js";
import ProfileCard from "../profileCard/profileCard.jsx";
import PostView from "../postView/postView.jsx";
import LimitedText from "../limitedText./limitedText.jsx";
import classes from "./postMsg.module.css";

function PostMsg({ postId }) {
  const [post, setPost] = useState(null);
  const modal = useContext(modalContext);

  useEffect(() => {
    api.getOnePost(postId).then((res) => {
      setPost(res.post);
    });
  }, [postId]);

  if (!post) return;

  return (
    <div
      className={classes.container}
      onClick={() => {
        modal.open(<PostView post={post} />);
      }}
    >
      <div className={classes.top}>
        <ProfileCard profile={post.author} fullName={false} imgSize={32} />
      </div>
      <div className={classes.image}>
        <PostThumbnail post={post} />
      </div>
      <div className={classes.details}>
        <div className="semibold-text small-text">
          <LimitedText text={post.content} limit={50} extendable={false} />
        </div>
      </div>
    </div>
  );
}

PostMsg.propTypes = {
  postId: PropTypes.number,
};

export default PostMsg;
