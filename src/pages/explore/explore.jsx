import { useState, useEffect, useCallback, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import PostOverViewList from "../../components/postOverViewList/postOverViewList.jsx";
import Footer from "../../components/footer/footer.jsx";
import api from "../../../api.js";
import { isNearScrollEnd } from "../../utils/isNearScrollEnd.js";
import classes from "./explore.module.css";

function Explore() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const curInterval = useRef();
  const callback = useOutletContext();

  callback();

  const checkScroll = useCallback(() => {
    if (loading || !posts) return;

    if (isNearScrollEnd()) {
      setLoading(true);
      api.getRandomPosts(posts.length).then((res) => {
        setLoading(false);
        if (res.ok) {
          setPosts([...posts, ...res.posts]);
        }
      });
    }
  }, [posts, loading]);

  useEffect(() => {
    curInterval.current = setInterval(() => {
      checkScroll();
    }, 3000);
    return () => {
      clearInterval(curInterval.current);
    };
  }, [checkScroll]);

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
