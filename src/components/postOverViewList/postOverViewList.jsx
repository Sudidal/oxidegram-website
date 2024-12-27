import PropTypes from "prop-types";
import PostOverview from "../postOverview/postOverview.jsx";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import classes from "./postOverViewList.module.css";

function PostOverViewList({ posts }) {
  return (
    <div className={classes.list}>
      {posts?.length > 0 ? (
        posts.map((post) => {
          return (
            <div key={post.id} className={classes.card}>
              <PostOverview post={post} />
            </div>
          );
        })
      ) : (
        <div className={classes.empty}>
          <SvgFileToInline path={"/icons/camera.svg"} />
          <p className="semibold-text giga-text">No Posts Yet</p>
        </div>
      )}
    </div>
  );
}

PostOverViewList.propTypes = {
  posts: PropTypes.object,
};

export default PostOverViewList;
