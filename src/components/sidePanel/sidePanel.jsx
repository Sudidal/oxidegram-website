import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import modalContext from "../../contexts/modalContext.js";
import dialogContext from "../../contexts/dialogContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import FullSizeBtn from "../fullSizeBtn/fullSizeBtn.jsx";
import classes from "./sidePanel.module.css";

function SidePanel() {
  const profile = useContext(profileContext);
  const modal = useContext(modalContext);
  const dialog = useContext(dialogContext);
  const nav = useNavigate();

  return (
    <aside className={classes.aside}>
      <div
        className={classes.logo}
        onClick={() => {
          nav("/");
        }}
      >
        <SvgFileToInline path={"/icons/instagram-logo.svg"} />
      </div>

      <div className={classes.btnsList}>
        <FullSizeBtn
          iconUrl={"/icons/home.svg"}
          text={"Home"}
          onClick={() => {
            nav("/");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/search.svg"}
          text={"Search"}
          onClick={() => {
            nav("/search");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/explore.svg"}
          text={"Explore"}
          onClick={() => {
            nav("/explore");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/reels.svg"}
          text={"Reels"}
          onClick={() => {
            nav("/reels");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/messenger.svg"}
          text={"Messages"}
          onClick={() => {
            nav("/messages");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/heart.svg"}
          text={"Notifications"}
          onClick={() => {
            nav("/notifications");
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/create.svg"}
          text={"Create"}
          onClick={() => {
            modal.open();
          }}
        />
        <FullSizeBtn
          iconUrl={"/icons/dashboard.svg"}
          text={"Dashboard"}
          onClick={() => {
            nav("/dashboard");
          }}
        />
        {profile && (
          <FullSizeBtn
            icon={<AvatarImg url={profile.avatarUrl} width={30} />}
            text={"Profile"}
            onClick={() => {
              nav("/profile");
            }}
          />
        )}
        <FullSizeBtn
          iconUrl={"/icons/more.svg"}
          text={"More"}
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

export default SidePanel;
