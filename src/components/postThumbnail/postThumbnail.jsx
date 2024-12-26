import { useState } from "react";
import PropTypes from "prop-types";
import { getVideoThumbnail } from "../../utils/getVideoThumbnail.js";
import classes from "./postThumbnail.module.css";

function PostThumbnail({ post }) {
  const [image, setImage] = useState(post.imageUrl);

  function loadFail() {
    getVideoThumbnail(post.imageUrl, (image) => {
      setImage(image);
    });
  }

  return (
    <img className={classes.image} src={image} onError={loadFail} alt="" />
  );
}

PostThumbnail.propTypes = {
  post: PropTypes.object,
};

export default PostThumbnail