import { useEffect, useState } from "react";
import PostsList from "../../components/postsList/postsList.jsx";
import SidePanel from "../../components/sidePanel/sidePanel.jsx";
import api from "../../../api.js";
import classes from "./reels.module.css";

function Reels() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    api.getTopVideos().then((res) => {
      setPosts(res.posts);
    });
  }, []);

  return (
    <main className={`main-with-margin ${classes.container}`}>
      <SidePanel />
      <PostsList posts={posts} />
    </main>
  );
}

export default Reels;
