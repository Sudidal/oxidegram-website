import { useContext } from "react";
import profileContext from "../../contexts/profileContext.js";
import modalContext from "../../contexts/modalContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import classes from "./sidePanel.module.css";

function SidePanel() {
  const profile = useContext(profileContext);
  const modal = useContext(modalContext);

  return (
    <aside className={classes.aside}>
      <div className={classes.logo}>
        <SvgFileToInline path={"/icons/instagram-logo.svg"} />
      </div>

      <div className={classes.btnsList}>
        <div
          className={classes.btn}
          onClick={() => {
            console.log("home");
          }}
        >
          <SvgFileToInline path={"/icons/home.svg"} />
          <p>Home</p>
        </div>
        <div
          className={classes.btn}
          onClick={() => {
            console.log("search");
          }}
        >
          <SvgFileToInline path={"/icons/search.svg"} />
          <p>Search</p>
        </div>
        <div
          className={classes.btn}
          onClick={() => {
            console.log("explore");
          }}
        >
          <SvgFileToInline path={"/icons/explore.svg"} />
          <p>Explore</p>
        </div>
        <div
          className={classes.btn}
          onClick={() => {
            console.log("reels");
          }}
        >
          <SvgFileToInline path={"/icons/reels.svg"} />
          <p>Reels</p>
        </div>
        <div
          className={classes.btn}
          onClick={() => {
            console.log("messenger");
          }}
        >
          <SvgFileToInline path={"/icons/messenger.svg"} />
          <p>Messages</p>
        </div>
        <div
          className={classes.btn}
          onClick={() => {
            console.log("heart");
          }}
        >
          <SvgFileToInline path={"/icons/heart.svg"} />
          <p>Notifications</p>
        </div>
        <div
          className={classes.btn}
          onClick={() => {
            modal.current.open()
          }}
        >
          <SvgFileToInline path={"/icons/create.svg"} />
          <p>Create</p>
        </div>
        <div
          className={classes.btn}
          onClick={() => {
            console.log("dashboard");
          }}
        >
          <SvgFileToInline path={"/icons/dashboard.svg"} />
          <p>Dashboard</p>
        </div>
        <div
          className={classes.btn}
          onClick={() => {
            console.log("Profile");
          }}
        >
          {profile && <AvatarImg url={profile.avatarUrl} width={30} />}
          <p>Profile</p>
        </div>
        <div
          className={classes.btn}
          onClick={() => {
            console.log("more");
          }}
        >
          <SvgFileToInline path={"/icons/more.svg"} />
          <p>More</p>
        </div>
      </div>
    </aside>
  );
}

export default SidePanel;
