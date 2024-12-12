import { useState } from "react";
import PropTypes from "prop-types";
import classes from "./postCard.module.css";
import dateOps from "../../utils/dateOps.js";
import PostActions from "../postActions/postActions.jsx";
import CoolVideo from "../coolVideo/coolVideo.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";

function PostCard({ post }) {
  const [isVideo, setIsVideo] = useState(false);

  function loadFail() {
    setIsVideo(true);
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
        <img
          className={classes.img}
          src={post.imageUrl}
          onError={loadFail}
        />
      )}
      <div className={classes.bottom}>
        <PostActions />
      </div>
      <div className={classes.details}>
        <p className="prim-text">{post._count.likers} Likes</p>
        <div>
          <p className="prim-text inline-para">{post.author.username} </p>
          <p className="inline-para">{post.content}</p>
        </div>
        <p className="secon-text">View all {post._count.comments} comments</p>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
