import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import api from "../../../api.js";
import profileContext from "../../contexts/profileContext.js";
import alertContext from "../../contexts/alertContext.js";
import AvatarImg from "../../components/avatarImg/avatarImg.jsx";
import SvgFileToInline from "../../components/svgFileToInline/svgFileToInline.jsx";
import PostOverview from "../../components/postOverview/postOverview.jsx";
import Tabs from "../../components/tabs/tabs.jsx";
import classes from "./profile.module.css";

function Profile() {
  const [reqProfile, setReqProfile] = useState(null);
  const [followed, setFollowed] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const profile = useContext(profileContext);
  const alert = useContext(alertContext);
  const params = useParams();
  const nav = useNavigate();
  const onRender = useOutletContext();

  onRender();

  const profileId = params.profileId;
  console.log(followed);

  useEffect(() => {
    api.getProfile(profileId).then((res) => {
      setReqProfile(res.profile);
      setFollowed(res.profile.followed);
      api.getDetailsOfOneProfile(profileId).then((detailRes) => {
        setProfileDetails(detailRes.profile);
      });
    });
  }, [profileId]);

  return (
    <div>
      {profileDetails && (
        <main className={`${classes.main} main-with-margin`}>
          <div className={classes.profileInfo}>
            <div>
              <AvatarImg width={150} url={reqProfile.avatarUrl} />
            </div>
            <div className={classes.right}>
              <div className={classes.proTop}>
                <p className="huge-text">{reqProfile.username}</p>
                {reqProfile.id !== profile.id &&
                  (followed ? (
                    <button
                      className="secondary-btn"
                      onClick={() => {
                        api.unfollow(reqProfile.id).then((res) => {
                          alert.show(res.msg);
                          if (res.ok) {
                            setFollowed(false);
                          }
                        });
                      }}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="primary-btn"
                      onClick={() => {
                        api.follow(reqProfile.id).then((res) => {
                          alert.show(res.msg);
                          if (res.ok) {
                            setFollowed(true);
                          }
                        });
                      }}
                    >
                      Follow
                    </button>
                  ))}
                {reqProfile.id !== profile.id && (
                  <button
                    className="secondary-btn"
                    onClick={() => {
                      api.addContact(reqProfile.id).then((res) => {
                        if (res.ok) {
                          nav("/messages");
                        } else {
                          alert.show(res.msg);
                        }
                      });
                    }}
                  >
                    Message
                  </button>
                )}
                {reqProfile.id === profile.id && (
                  <button
                    className="secondary-btn"
                    onClick={() => {
                      nav("/settings");
                    }}
                  >
                    Edit profile
                  </button>
                )}
              </div>
              <div className={`big-text ${classes.proMiddle}`}>
                <p>
                  <span className="semibold-text">
                    {profileDetails.posts.length}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="semibold-text">
                    {profileDetails.followers.length}
                  </span>{" "}
                  followers
                </p>
                <p>
                  <span className="semibold-text">
                    {profileDetails.follows.length}
                  </span>{" "}
                  following
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
                    {profileDetails.savedPosts.length > 0 ? (
                      profileDetails.posts.map((post) => {
                        return (
                          <div key={post.id} className={classes.postCard}>
                            <PostOverview post={post} />
                          </div>
                        );
                      })
                    ) : (
                      <div className={classes.empty}>
                        <SvgFileToInline path={"/icons/camera.svg"} />
                        <p className="semibold-text giga-text">No Posts Yet</p>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                name: "SAVED",
                iconPath: "/icons/save-small.svg",
                content: (
                  <div className={classes.posts}>
                    {profileDetails.savedPosts.length > 0 ? (
                      profileDetails.savedPosts.map((post) => {
                        return (
                          <div key={post.id} className={classes.postCard}>
                            <PostOverview post={post} />
                          </div>
                        );
                      })
                    ) : (
                      <div className={classes.empty}>
                        <SvgFileToInline path={"/icons/camera.svg"} />
                        <p className="semibold-text giga-text">No Posts Yet</p>
                      </div>
                    )}
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
