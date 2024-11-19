import { useState, useEffect, useContext } from "react";
import profileContext from "../contexts/userContext.js";
import api from "../../api.js";
import SidePanel from "../components/sidePanel/sidePanel.jsx";
import PostsList from "../components/postsList/postsList.jsx";
import ProfileCard from "../components/profileCard/profileCard.jsx";

function Home() {
  const [posts, setPosts] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const profile = useContext(profileContext);

  useEffect(() => {
    api.getTopPosts().then((res) => {
      setPosts(res.posts);
    });
    api.getTopProfiles().then((res) => {
      setProfiles(res.profiles);
    });
  }, []);

  return (
    <div className="container">
      <SidePanel />
      <main className="main">
        <div className="middle">
          <PostsList posts={posts} />
        </div>
        <div className="right-side">
          <div className="content">
            {profile && <ProfileCard profile={profile} />}
            <div className="suggested">
              <p className="secon-text text">Suggested for you</p>
              <div className="list">
                {
                  profiles &&
                    profiles.map((profile) => {
                      return <ProfileCard key={profile.id} profile={profile} />;
                    })
                }
              </div>
            </div>
            <nav className="nav">
              <ul>
                <li className="tertiary-text">About</li>
                <li className="tertiary-text">Help</li>
                <li className="tertiary-text">Press</li>
                <li className="tertiary-text">API</li>
                <li className="tertiary-text">Jobs</li>
                <li className="tertiary-text">Privacy</li>
                <li className="tertiary-text">Terms</li>
                <li className="tertiary-text">Locations</li>
                <li className="tertiary-text">Language</li>
                <li className="tertiary-text">Oxide</li>
                <li className="tertiary-text">Verified</li>
              </ul>
            </nav>
            <p className="tertiary-text">© 2024 OXIDEGRAM FROM OXIDE</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
