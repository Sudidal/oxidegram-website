import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PostOverview from "../../components/postOverview/postOverview.jsx";
import api from "../../../api.js";
import classes from "./explore.module.css";

function Explore() {
  const [posts, setPosts] = useState(null);
  const callback = useOutletContext();

  callback();

  useEffect(() => {
    api.getRandomPosts().then((res) => {
      setPosts(res.posts);
    });
  }, []);

  if (!posts) return;

  return (
    <div className={`main-with-margin ${classes.container}`}>
      <div className={classes.postsList}>
        {posts.map((post) => {
          return (
            <div key={post.id} className={classes.postCard}>
              <PostOverview post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Explore;
