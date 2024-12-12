import { useContext, useState, useEffect, useRef } from "react";
import api from "../../../api.js";
import PropTypes from "prop-types";
import modalContext from "../../contexts/modalContext.js";
import PostActions from "../postActions/postActions.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import Comment from "../comment/comment.jsx";
import dateOps from "../../utils/dateOps.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import CoolVideo from "../coolVideo/coolVideo.jsx";
import classes from "./postView.module.css";

function PostView({ post }) {
  const [update, setUpdate] = useState(null);
  const [comments, setComments] = useState(null);
  const modal = useContext(modalContext);
  const commentInputRef = useRef(null);

  useEffect(() => {
    api.getCommentsOfPost(post.id).then((res) => {
      setComments(res.comments);
    });
  }, [post, update]);

  function postComment() {
    const content = commentInputRef.current.value;
    api.makeComment(content, post.id).then(() => {
      console.log("made a comment");
      commentInputRef.current.value = ""
      setUpdate(!update);
    });
  }

  const isVideo = post.fileType === "VIDEO"

  return (
    <div className={classes.container}>
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
      <div className={classes.left}>
        {isVideo ? (
          <CoolVideo className={classes.img} src={post.imageUrl} controls />
        ) : (
          <img className={classes.img} src={post.imageUrl} alt="" />
        )}
      </div>
      <div className={classes.right}>
        <div className={classes.top}>
          <AvatarImg url={post.author.avatarUrl} width={32} />
          <p className="semibol-text">{post.author.username}</p>
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
          <PostActions />
          <div className={classes.details}>
            <p className="semibold-text">{post._count.likers} Likes</p>
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
};

export default PostView;
