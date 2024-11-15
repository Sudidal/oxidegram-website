import { useState, useEffect } from "react";
import api from "../../api.js";
import PostsList from "../components/postsList/postsList.jsx";

function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    api.getTopPosts().then((res) => {
      setPosts(res.posts);
    });
  }, []);

  return (
    <div className="container">
      <aside className="aside">
        <div className="logo">Oxidegram</div>
        <ul className="unstyled-list">
          <li>Home</li>
          <li>Search</li>
          <li>Explore</li>
          <li>Messages</li>
          <li>Notifications</li>
          <li>Create</li>
        </ul>
      </aside>
      <main className="main">
        <PostsList posts={posts} />
      </main>
      <div className="right-side"></div>
    </div>
  );
}

export default Home;
