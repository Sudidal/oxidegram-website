import { useEffect, useContext, useState } from "react";
import profileContext from "../../contexts/profileContext.js";
import api from "../../../api.js";
import SidePanel from "../../components/sidePanel/sidePanel.jsx";
import AvatarImg from "../../components/avatarImg/avatarImg.jsx";
import SvgFileToInline from "../../components/svgFileToInline/svgFileToInline.jsx";
import PostOverview from "../../components/postOverview/postOverview.jsx";
import Tabs from "../../components/tabs/tabs.jsx";
import InlineImageText from "../../components/inlineImageText/inlineImageText.jsx";
import classes from "./profile.module.css";

function Profile() {
  const profile = useContext(profileContext);
  const [detailedProfile, setDetailedProfile] = useState(null);

  useEffect(() => {
    api.getOneProfileWithDetails(profile.id).then((res) => {
      setDetailedProfile(res.profile);
    });
  }, [profile.id]);

  return (
    <div>
      <SidePanel />
      {detailedProfile && (
        <main className={`${classes.main} main-with-margin`}>
          <div className={classes.profileInfo}>
            <div>
              <AvatarImg width={150} url={profile.avatarUrl} />
            </div>
            <div className={classes.right}>
              <div className={classes.proTop}>
                <p className="huge-text">{profile.username}</p>
                <button className="secondary-btn">Follow</button>
                <button className="secondary-btn">Message</button>
                <SvgFileToInline path={"/icons/gear.svg"} />
              </div>
              <div className={classes.proMiddle}>
                <p>
                  <span className="big-text-semibold">
                    {detailedProfile.posts.length}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="big-text-semibold">
                    {detailedProfile.followers.length}
                  </span>{" "}
                  followers
                </p>
                <p>
                  <span className="big-text-semibold">
                    {detailedProfile.follows.length}
                  </span>{" "}
                  following
                </p>
              </div>
              <div className={classes.proBottom}>
                <p className="semibold-text normal-text">{profile.fullName}</p>
                <p>{profile.bio}</p>
                <p className="semibold-text flexbox"><SvgFileToInline path={"/icons/link.svg"} /> {profile.websiteUrl}</p>
              </div>
            </div>
          </div>
          <hr className="seperator" />
          <Tabs
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
