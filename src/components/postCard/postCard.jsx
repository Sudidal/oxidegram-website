import PropTypes from "prop-types";
import classes from "./postCard.module.css";
import ageFromIsoString from "../../../utils/ageFromIsoString.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";

function PostCard({ post }) {
  const url = post.author.avatarUrl;
  return (
    <div className={classes.card}>
      <div className={classes.top}>
        <img className={classes.avatar} src={url} alt="" />
        <p className="prim-text">{post.author.username}</p>
        <p>•</p>
        <p className="secon-text">{ageFromIsoString(post.publishDate)}</p>
      </div>
      <img
        className={classes.img}
        src="https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg"
        alt=""
      />
      <div className={classes.bottom}>
        <div className={classes.leftSide}>
          <SvgFileToInline path={"icons/heart.svg"} />
          <SvgFileToInline path={"icons/comment.svg"} />
          <SvgFileToInline path={"icons/share.svg"} />
        </div>
        <div className={classes.rightSide}>
        <SvgFileToInline path={"icons/save.svg"} />
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
