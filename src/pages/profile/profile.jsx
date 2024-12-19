import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api.js";
import profileContext from "../../contexts/profileContext.js";
import SidePanel from "../../components/sidePanel/sidePanel.jsx";
import AvatarImg from "../../components/avatarImg/avatarImg.jsx";
import SvgFileToInline from "../../components/svgFileToInline/svgFileToInline.jsx";
import PostOverview from "../../components/postOverview/postOverview.jsx";
import Tabs from "../../components/tabs/tabs.jsx";
import classes from "./profile.module.css";

function Profile() {
  const [reqProfile, setProfile] = useState(null);
  const [detailedProfile, setDetailedProfile] = useState(null);
  const profile = useContext(profileContext);
  const params = useParams();
  const nav = useNavigate()

  const profileId = params.profileId;

  useEffect(() => {
    api.getProfile(profileId).then((res) => {
      setProfile(res.profile);
      api.getDetailsOfOneProfile(profileId).then((res) => {
        setDetailedProfile(res.profile);
      });
    });
  }, [profileId]);

  return (
    <div>
      <SidePanel />
      {detailedProfile && (
        <main className={`${classes.main} main-with-margin`}>
          <div className={classes.profileInfo}>
            <div>
              <AvatarImg width={150} url={reqProfile.avatarUrl} />
            </div>
            <div className={classes.right}>
              <div className={classes.proTop}>
                <p className="huge-text">{reqProfile.username}</p>
                {reqProfile.id !== profile.id && (
                  <button className="primary-btn">Follow</button>
                )}
                {reqProfile.id !== profile.id && (
                  <button className="secondary-btn">Message</button>
                )}
                {reqProfile.id === profile.id && (
                  <button className="secondary-btn" onClick={() => {
                    nav("/settings")
                  }}>Edit profile</button>
                )}
              </div>
              <div className={`big-text ${classes.proMiddle}`}>
                <p>
                  <span className="semibold-text">{detailedProfile.posts.length}</span> posts
                </p>
                <p>
                  <span className="semibold-text">{detailedProfile.followers.length}</span> followers
                </p>
                <p>
                  <span className="semibold-text">{detailedProfile.follows.length}</span> following
                </p>
              </div>
              <div className={classes.proBottom}>
                <p className="semibold-text">{reqProfile.fullName}</p>
                <p>{reqProfile.bio}</p>
                {reqProfile.websiteUrl && (
                  <div className="semibold-text flexbox">
                    <SvgFileToInline path={"/icons/link.svg"} />{" "}
                    {reqProfile.websiteUrl}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Tabs
            initTab={params.tab}
            tabs={[
              {
                name: "POSTS",
                iconPath: "/icons/grid.svg",
                content: (
                  <div className={classes.posts}>
                    {detailedProfile.posts.map((post) => {
                      return <PostOverview key={post.id} post={post} />;
                    })}
                  </div>
                ),
              },
              {
                name: "SAVED",
                iconPath: "/icons/save-small.svg",
                content: (
                  <div className={classes.posts}>
                    {detailedProfile.savedPosts.map((post) => {
                      return <PostOverview key={post.id} post={post} />;
                    })}
                  </div>
                ),
              },
            ]}
          />
        </main>
      )}
    </div>
  );
}

export default Profile;
