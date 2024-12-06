import { useContext } from "react";
import PropTypes from "prop-types";
import modalContext from "../../contexts/modalContext.js";
import PostView from "../postView/postView.jsx";
import classes from "./postOverview.module.css";

function PostOverview({ post }) {
  const modal = useContext(modalContext);

  return (
    <div
      className={classes.container}
      onClick={() => {
        modal.open(<PostView post={post} />);
      }}
    >
      <img className={classes.image} src={post.imageUrl} alt="" />
    </div>
  );
}

PostOverview.propTypes = {
  post: PropTypes.object,
};

export default PostOverview;
