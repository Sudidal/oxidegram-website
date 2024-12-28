import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import PostsList from "../../components/postsList/postsList.jsx";
import Footer from "../../components/footer/footer.jsx";
import api from "../../../api.js";
import classes from "./reels.module.css";

function Reels() {
  const [posts, setPosts] = useState(null);
  const onRender = useOutletContext()

  onRender()

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
