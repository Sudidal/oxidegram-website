import PropTypes from "prop-types";
import classes from "./postOverview.module.css";

function PostOverview({ post }) {
  return (
    <div className={classes.container}>
      <img className={classes.image} src={post.imageUrl} alt="" />
    </div>
  );
}

PostOverview.propTypes = {
  post: PropTypes.object,
};

export default PostOverview;
