import { useState, useContext } from "react";
import modalContext from "../../contexts/modalContext.js";
import PropTypes from "prop-types";
import dateOps from "../../utils/dateOps.js";
import PostActions from "../postActions/postActions.jsx";
import CoolVideo from "../coolVideo/coolVideo.jsx";
import PostView from "../postView/postView.jsx";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import PostOptions from "../postOptions/postOptions.jsx";
import ProfileCard from "../profileCard/profileCard.jsx";
import classes from "./postCard.module.css";

function PostCard({ post }) {
  const [likes, setLikes] = useState(post._count.likers);
  const modal = useContext(modalContext);
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
        <div className={classes.left}>
          <div className={classes.profileCard}>
            <ProfileCard profile={post.author} imgSize={32} fullName={false} />
          </div>
          <div className="secon-text">•</div>
          <p className="secon-text">
            {dateOps.getAgeFromIsoString(post.publishDate)}
          </p>
        </div>
        <div className={classes.right}>
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
      <div className={classes.middle}>
        {isVideo ? (
          <CoolVideo
            src={post.imageUrl}
            className={classes.img}
            maxHeight={"95vh"}
          />
        ) : (
          <img className={classes.img} src={post.imageUrl} />
        )}
      </div>
      <div className={classes.bottom}>
        <div className={classes.actions}>
          <PostActions post={post} onChange={change} />
        </div>
        <div className={classes.details}>
          <p className="semibold-text">{likes} Likes</p>
          <div>
            <p className="semibold-text inline-para">{post.author.username} </p>
            <p className="inline-para">{post.content}</p>
          </div>
          <div
            onClick={() => {
              modal.open(<PostView post={post} />);
            }}
            className="secon-text"
          >
            View all {post._count.comments} comments
          </div>
        </div>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
