import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import PostView from "../../components/postView/postView.jsx";
import api from "../../../api.js";
import classes from "./posts.module.css";

function Posts() {
  const [post, setPost] = useState(null);
  const postId = useParams().postId;
  const onRender = useOutletContext();

  onRender();

  useEffect(() => {
    api.getOnePost(postId).then((res) => {
      setPost(res.post);
    });
  });

  if (!post) return;

  return (
    <div className={`main-with-margin ${classes.container}`}>
      <div className={classes.wrapper}>
        <PostView post={post} fullScreen={true} />
      </div>
    </div>
  );
}

export default Posts;
