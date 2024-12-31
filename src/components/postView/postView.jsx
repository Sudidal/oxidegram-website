import { useContext, useState, useEffect, useRef } from "react";
import api from "../../../api.js";
import PropTypes from "prop-types";
import modalContext from "../../contexts/modalContext.js";
import alertContext from "../../contexts/alertContext.js";
import PostActions from "../postActions/postActions.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import Comment from "../comment/comment.jsx";
import dateOps from "../../utils/dateOps.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import CoolVideo from "../coolVideo/coolVideo.jsx";
import PostOptions from "../postOptions/postOptions.jsx";
import classes from "./postView.module.css";

function PostView({ post, fullScreen = false }) {
  const [update, setUpdate] = useState(null);
  const [comments, setComments] = useState(null);
  const [likes, setLikes] = useState(post._count.likers);
  const modal = useContext(modalContext);
  const alert = useContext(alertContext);
  const commentInputRef = useRef(null);

  useEffect(() => {
    api.getCommentsOfPost(post.id).then((res) => {
      setComments(res.comments);
    });
  }, [post, update]);

  function postComment() {
    const content = commentInputRef.current.value;
    commentInputRef.current.value = "";
    api.makeComment(content, post.id).then((res) => {
      setUpdate(!update);
      if (!res.ok) {
        alert.show(res.msg);
      }
    });
  }

  function action(ev) {
    switch (ev) {
      case "like":
        setLikes(likes + 1);
        break;
      case "unlike":
        setLikes(likes - 1);
    }
  }

  const isVideo = post.fileType === "VIDEO";

  return (
    <div className={classes.container}>
      {!fullScreen && (
        <div className={classes.closeBtn}>
          <button
            className="unstyled-btn"
            onClick={() => {
              modal.close();
            }}
          >
            <SvgFileToInline path={"/icons/cross.svg"} />
          </button>
        </div>
      )}
      <div className={classes.left}>
        {isVideo ? (
          <CoolVideo className={classes.img} src={post.imageUrl} controls />
        ) : (
          <img className={classes.img} src={post.imageUrl} alt="" />
        )}
      </div>
      <div className={classes.right}>
        <div className={classes.top}>
          <div className={classes.topLeft}>
            <AvatarImg url={post.author.avatarUrl} width={32} />
            <p className="semibol-text">{post.author.username}</p>
          </div>
          <div className={classes.topRight}>
            <button
              className="unstyled-btn"
              onClick={() => {
                modal.open(<PostOptions post={post} />);
              }}
            >
              <SvgFileToInline path={"/icons/three-dots.svg"} />
            </button>
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.commentsList}>
            <Comment
              comment={{
                author: post.author,
                content: post.content,
              }}
            />
            {comments &&
              comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
              })}
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottomUpper}>
            <PostActions post={post} onChange={action} />
            <div className={classes.details}>
              <p className="semibold-text">{likes} Likes</p>
              <p className="small-text secon-text">
                {dateOps.getAgeFromIsoString(post.publishDate, false)}
              </p>
            </div>
          </div>
          <form
            className={classes.form}
            onSubmit={(ev) => {
              ev.preventDefault();
              postComment();
            }}
          >
            <input
              className="unstyled-input"
              type="text"
              placeholder="Add a comment..."
              ref={commentInputRef}
            />
            <button type="submit" className="no-border-btn">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

PostView.propTypes = {
  post: PropTypes.object,
  fullScreen: PropTypes.bool,
};

export default PostView;
