import { useContext, useState } from "react";
import PropTypes from "prop-types";
import modalContext from "../../contexts/modalContext.js";
import PostView from "../postView/postView.jsx";
import { getVideoThumbnail } from "../../utils/getVideoThumbnail.js";
import classes from "./postOverview.module.css";

function PostOverview({ post }) {
  const modal = useContext(modalContext);
  const [thumbnail, setThumbnail] = useState(post.imageUrl);

  function loadFail() {
    getVideoThumbnail(post.imageUrl, (image) => {
      setThumbnail(image);
    });
  }

  return (
    <div
      className={classes.container}
      onClick={() => {
        modal.open(<PostView post={post} />);
      }}
    >
      <img
        className={classes.image}
        src={thumbnail}
        onError={loadFail}
        alt=""
      />
    </div>
  );
}

PostOverview.propTypes = {
  post: PropTypes.object,
};

export default PostOverview;
