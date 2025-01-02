import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../../api.js";
import profileContext from "../../contexts/profileContext.js";
import alertContext from "../../contexts/alertContext.js";
import AvatarImg from "../../components/avatarImg/avatarImg.jsx";
import SvgFileToInline from "../../components/svgFileToInline/svgFileToInline.jsx";
import PostOverViewList from "../../components/postOverViewList/postOverViewList.jsx";
import Tabs from "../../components/tabs/tabs.jsx";
import Footer from "../../components/footer/footer.jsx";
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

  const reqProfileId = parseInt(params.profileId);
  const isMine = profile.id === reqProfileId;

  useEffect(() => {
    api.getProfile(reqProfileId).then((res) => {
      setReqProfile(res.profile);
      setFollowed(res.profile.followed);
      api.getDetailsOfOneProfile(reqProfileId).then((detailRes) => {
        setProfileDetails(detailRes.profile);
      });
    });
  }, [reqProfileId]);

  if (!profileDetails) return;

  const tabs = [
    {
      name: "POSTS",
      iconPath: "/icons/grid.svg",
      content: <PostOverViewList posts={profileDetails.posts} />,
    },
  ];

  if (isMine) {
    tabs.push({
      name: "SAVED",
      iconPath: "/icons/save-small.svg",
      content: <PostOverViewList posts={profileDetails.savedPosts} />,
    });
  }

  return (
    <div>
      <main className="main-with-margin">
        <div className={classes.container}>
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
                  <Link target="_blank" referrerPolicy="no-referrer" to={reqProfile.websiteUrl} className="semibold-text flexbox unstyled-link">
                    <SvgFileToInline path={"/icons/link.svg"} />{" "}
                    {reqProfile.websiteUrl}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <Tabs initTab={params.tab} tabs={tabs} />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Profile;
