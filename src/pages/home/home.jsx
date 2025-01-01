import { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../../api.js";
import PostsList from "../../components/postsList/postsList.jsx";
import { isNearScrollEnd } from "../../utils/isNearScrollEnd.js";
import SuggestionsPanel from "../../components/suggestionsPanel/suggestionsPanel.jsx";
import classes from "./home.module.css";

function Home() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const curInterval = useRef();
  const onRender = useOutletContext();

  onRender();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1160px)");
    mediaQuery.addEventListener("change", resolutionChange);
    return () => {
      mediaQuery.removeEventListener("change", resolutionChange);
    };
  }, []);

  function resolutionChange(ev) {
    console.log("media change", ev);
    if (ev.matches) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }

  const checkScroll = useCallback(() => {
    if (loading || !posts) return;

    if (isNearScrollEnd()) {
      setLoading(true);
      api.getTopPosts(posts.length).then((res) => {
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
    api.getTopPosts().then((res) => {
      setPosts(res.posts);
    });
  }, []);

  return (
    <div className={classes.container}>
      <main className={`${classes.main} main-with-margin`}>
        <div className={classes.middle}>
          <PostsList posts={posts} />
        </div>
        {!smallScreen && (
          <div className={classes.rightSide}>
            <SuggestionsPanel />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
