import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import modalContext from "../../contexts/modalContext.js";
import dialogContext from "../../contexts/dialogContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import FullSizeBtn from "../fullSizeBtn/fullSizeBtn.jsx";
import CreatePost from "../createPost/createPost.jsx"
import classes from "./sidePanel.module.css";

function SidePanel({ collapsed }) {
  const profile = useContext(profileContext);
  const modal = useContext(modalContext);
  const dialog = useContext(dialogContext);
  const nav = useNavigate();

  const textItems = [
    "Home",
    "Search",
    "Explore",
    "Reels",
    "Messages",
    "Notifications",
    "Create",
    "Dashboard",
    "Profile",
    "More",
  ];
  if (collapsed) {
    document.body.classList.add("collapsed-panel")
    
    for (let i = 0; i < textItems.length; i++) {
      textItems[i] = "";
    }
  }
  else {
    document.body.classList.remove("collapsed-panel")
  }
  let counter = 0;

  return (
    <aside className={`${classes.aside} ${collapsed ? classes.collapsed : ""}`}>
      <div
        className={classes.logo}
        onClick={() => {
          nav("/");
        }}
      >
        {collapsed ? (
          <FullSizeBtn iconUrl={"/icons/instagram-logo.svg"} />
        ) : (
          <div className={classes.textLogo}>
            <SvgFileToInline path={"/icons/instagram-text-logo.svg"} />
          </div>
        )}
      </div>

      <div className={classes.btnsList}>
        <FullSizeBtn
          iconUrl={"/icons/home.svg"}
          text={textItems[counter++]}
          onClick={() => {
            nav("/");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/search.svg"}
          text={textItems[counter++]}
          onClick={() => {
            nav("/search");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/explore.svg"}
          text={textItems[counter++]}
          onClick={() => {
            nav("/explore");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/reels.svg"}
          text={textItems[counter++]}
          onClick={() => {
            nav("/reels");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/messenger.svg"}
          text={textItems[counter++]}
          onClick={() => {
            nav("/messages");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/heart.svg"}
          text={textItems[counter++]}
          onClick={() => {
            nav("/notifications");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/create.svg"}
          text={textItems[counter++]}
          onClick={() => {
            modal.open(<CreatePost />);
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/dashboard.svg"}
          text={textItems[counter++]}
          onClick={() => {
            nav("/dashboard");
          }}
        />
        {profile && (
          <FullSizeBtn
            icon={<AvatarImg url={profile.avatarUrl} width={24} />}
            text={textItems[counter++]}
            onClick={() => {
              nav("/profiles/" + profile.id);
            }}
          />
        )}
        <FullSizeBtn
          iconUrl={"/icons/more.svg"}
          text={textItems[counter++]}
          onClick={(ev) => {
            dialog.open({
              x: ev.currentTarget.offsetLeft,
              y: ev.currentTarget.offsetTop,
            });
          }}
        />
      </div>
    </aside>
  );
}

SidePanel.propTypes = {
  collapsed: PropTypes.bool,
};

export default SidePanel;
