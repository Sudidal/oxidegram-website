import PropTypes from "prop-types";
import classes from "./postCard.module.css";
import ageFromIsoString from "../../../utils/ageFromIsoString.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";

function PostCard({ post }) {
  return (
    <div className={classes.card}>
      <div className={classes.top}>
        <div className={classes.avatar}>
          <AvatarImg width={32} url={post.author.avatarUrl} />
        </div>
        <p className="prim-text">{post.author.username}</p>
        <p>•</p>
        <p className="secon-text">{ageFromIsoString(post.publishDate)}</p>
      </div>
      <img alt="Couldn't load image" className={classes.img} src={post.imageUrl} />
      <div className={classes.bottom}>
        <div className={classes.leftSide}>
          <SvgFileToInline path={"/icons/heart.svg"} />
          <SvgFileToInline path={"/icons/comment.svg"} />
          <SvgFileToInline path={"/icons/share.svg"} />
        </div>
        <div className={classes.rightSide}>
          <SvgFileToInline path={"/icons/save.svg"} />
        </div>
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
