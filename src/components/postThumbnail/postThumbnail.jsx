import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { getVideoThumbnail } from "../../utils/getVideoThumbnail.js";
import classes from "./postThumbnail.module.css";

function PostThumbnail({ post }) {
  const [image, setImage] = useState(post.imageUrl);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (post.fileType === "VIDEO") {
      setIsLoading(true);
      getVideoThumbnail(post.imageUrl, (image) => {
        setImage(image);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [post]);

  return (
    <>{!isLoading && <img className={classes.image} src={image} alt="" />}</>
  );
}

PostThumbnail.propTypes = {
  post: PropTypes.object,
};

export default PostThumbnail;
