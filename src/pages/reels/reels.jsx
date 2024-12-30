import { useEffect, useState, useRef, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import PostsList from "../../components/postsList/postsList.jsx";
import Footer from "../../components/footer/footer.jsx";
import api from "../../../api.js";
import { isNearScrollEnd } from "../../utils/isNearScrollEnd.js";
import classes from "./reels.module.css";

function Reels() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const curInterval = useRef(false);
  const onRender = useOutletContext();

  onRender();

  const checkScroll = useCallback(() => {
    if (loading || !posts) return;

    if (isNearScrollEnd()) {
      setLoading(true);
      api.getTopVideos(posts.length).then((res) => {
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
    api.getTopVideos().then((res) => {
      setPosts(res.posts);
    });
  }, []);

  return (
    <main className={`main-with-margin ${classes.container}`}>
      <PostsList posts={posts} />
      <Footer />
    </main>
  );
}

export default Reels;
