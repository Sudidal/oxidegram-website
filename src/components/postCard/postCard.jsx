import { useState, useContext } from "react";
import modalContext from "../../contexts/modalContext.js";
import PropTypes from "prop-types";
import dateOps from "../../utils/dateOps.js";
import PostActions from "../postActions/postActions.jsx";
import CoolVideo from "../coolVideo/coolVideo.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import PostView from "../postView/postView.jsx";
import classes from "./postCard.module.css";

function PostCard({ post }) {
  const [likes, setLikes] = useState(post._count.likers);
  const modal = useContext(modalContext)
  const isVideo = post.fileType === "VIDEO";

  function change(ev) {
    switch (ev) {
      case "like":
        setLikes(likes + 1);
        break;
      case "unlike":
        setLikes(likes - 1);
    }
  }

  return (
    <div className={classes.card}>
      <div className={classes.top}>
        <div className={classes.avatar}>
          <AvatarImg width={32} url={post.author.avatarUrl} />
        </div>
        <p className="prim-text">{post.author.username}</p>
        <p>•</p>
        <p className="secon-text">
          {dateOps.getAgeFromIsoString(post.publishDate)}
        </p>
      </div>
      {isVideo ? (
        <CoolVideo src={post.imageUrl} className={classes.img} />
      ) : (
        <img className={classes.img} src={post.imageUrl} />
      )}
      <div className={classes.bottom}>
        <PostActions post={post} onChange={change} />
      </div>
      <div className={classes.details}>
        <p className="prim-text">{likes} Likes</p>
        <div>
          <p className="prim-text inline-para">{post.author.username} </p>
          <p className="inline-para">{post.content}</p>
        </div>
        <div onClick={() => {
          modal.open(<PostView post={post} />)
        }} className="secon-text">View all {post._count.comments} comments</div>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
