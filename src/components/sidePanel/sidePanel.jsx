import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import modalContext from "../../contexts/modalContext.js";
import dialogContext from "../../contexts/dialogContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import FullSizeBtn from "../fullSizeBtn/fullSizeBtn.jsx";
import CreatePost from "../createPost/createPost.jsx";
import SearchMenu from "../searchMenu/searchMenu.jsx";
import Notifications from "../notifications/notifications.jsx";
import classes from "./sidePanel.module.css";

function SidePanel({ state }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const profile = React.useContext(profileContext);
  const modal = React.useContext(modalContext);
  const dialog = React.useContext(dialogContext);
  const nav = useNavigate();

  React.useEffect(() => {
    setHidden(state === "hide");
    setCollapsed(state === "collapse");
  }, [state]);

  const mediaQuery = window.matchMedia("(max-width: 1263px)");
  mediaQuery.removeEventListener("change", handleResolutionChange);
  mediaQuery.addEventListener("change", handleResolutionChange);

  function handleResolutionChange(e) {
    if (e.matches) {
      setCollapsed(true);
    } else {
      setCollapsed(state === "collapse");
    }
  }

  let buttons = [
    {
      title: "Home",
      icon: "/icons/home.svg",
      onClick: () => {
        nav("/");
      },
    },
    {
      title: "Search",
      icon: "/icons/search.svg",
      onClick: () => {
        modal.open(<SearchMenu />);
      },
    },
    {
      title: "Explore",
      icon: "/icons/explore.svg",
      onClick: () => {
        nav("/explore");
      },
    },
    {
      title: "Reels",
      icon: "/icons/reels.svg",
      onClick: () => {
        nav("/reels");
      },
    },
    {
      title: "Messages",
      icon: "/icons/messenger.svg",
      onClick: () => {
        nav("/messages");
      },
    },
    {
      title: "Notifications",
      icon: "/icons/heart.svg",
      onClick: () => {
        modal.open(<Notifications />);
      },
    },
    {
      title: "Create",
      icon: "/icons/create.svg",
      onClick: () => {
        modal.open(<CreatePost />);
      },
    },
    {
      title: "Dashboard",
      icon: "/icons/dashboard.svg",
      onClick: () => {
        nav("/dashboard");
      },
    },
    {
      title: "Profile",
      elem: <AvatarImg url={profile.avatarUrl} width={24} />,
      onClick: () => {
        nav("/profiles/" + profile.id);
      },
    },
    {
      title: "More",
      icon: "/icons/more.svg",
      onClick: (ev) => {
        dialog.open({
          x: ev.currentTarget.offsetLeft,
          y: ev.currentTarget.offsetTop,
        });
      },
    },
  ];

  if (collapsed) {
    document.body.classList.add("collapsed-panel");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].title = "";
    }
  } else {
    document.body.classList.remove("collapsed-panel");
  }

  if (profile.id === undefined) {
    buttons = buttons.filter((i) => i.title !== "Profile");
  }

  if (hidden) return;

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
        {buttons.map((btn) => {
          return (
            <FullSizeBtn
              key={counter++}
              text={btn.title}
              iconUrl={btn.icon}
              icon={btn.elem}
              onClick={btn.onClick}
            />
          );
        })}
      </div>
    </aside>
  );
}

SidePanel.propTypes = {
  state: PropTypes.string,
};

export default SidePanel;
