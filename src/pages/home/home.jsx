import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import api from "../../../api.js";
import PostsList from "../../components/postsList/postsList.jsx";
import ProfileCard from "../../components/profileCard/profileCard.jsx";
import classes from "./home.module.css";

function Home() {
  const [posts, setPosts] = useState(null);
  const [topProfiles, setTopProfiles] = useState(null);
  const profile = useContext(profileContext);
  const onRender = useOutletContext()

  onRender()

  useEffect(() => {
    api.getTopPosts().then((res) => {
      setPosts(res.posts);
    });
    api.getTopProfiles().then((res) => {
      setTopProfiles(res.profiles);
    });
  }, []);

  return (
    <div className={classes.container}>
      <main className={`${classes.main} main-with-margin`}>
        <div className={classes.middle}>
          <PostsList posts={posts} />
        </div>
        <div className={classes.rightSide}>
          <div className={classes.content}>
            {profile && (
              <ProfileCard
                profile={profile}
                sideBtn={{
                  title: "Log out",
                  onClick: profile.logout,
                }}
              />
            )}
            <div className={classes.suggested}>
              <p className="secon-text-semibold">Suggested for you</p>
              <div className={classes.profileList}>
                {topProfiles &&
                  topProfiles.map((prof) => {
                    if (prof.id !== profile.id)
                      return (
                        <ProfileCard
                          key={prof.id}
                          profile={prof}
                          sideBtn={{
                            title: "Follow",
                            onClick: () => console.log("follow"),
                          }}
                        />
                      );
                  })}
              </div>
            </div>
            <div>
              <nav className={classes.nav}>
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
        </div>
      </main>
    </div>
  );
}

export default Home;
