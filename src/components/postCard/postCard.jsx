import PropTypes from "prop-types";
import classes from "./postCard.module.css";

function PostCard({ post }) {
  return (
    <div className={classes.card}>
      <img src="" alt="" />
      <p>{post.content}</p>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
