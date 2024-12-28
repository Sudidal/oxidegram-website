import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PostOverViewList from "../../components/postOverViewList/postOverViewList.jsx";
import Footer from "../../components/footer/footer.jsx";
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
      <PostOverViewList posts={posts} />
      <Footer />
    </div>
  );
}

export default Explore;
