import profileContext from "../../contexts/userContext.js";
import { useContext } from "react";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import classes from "./sidePanel.module.css";
import navButtons from "../../navButtons.json";

function SidePanel() {
  const profile = useContext(profileContext);

  return (
    <aside className={classes.aside}>
      <div className={classes.logo}>
        <SvgFileToInline path={"/icons/instagram-logo.svg"} />
      </div>
      <div className={classes.btnsList}>
        {navButtons.map((btn, i) => {
          if (btn.name === "Profile" && profile) {
            return (
              <div key={i} className={classes.btn}>
                <AvatarImg url={profile.avatarUrl} width={24} />
                <p>{btn.name}</p>
              </div>
            );
          }
          return (
            <div key={i} className={classes.btn}>
              <SvgFileToInline path={btn.iconPath} />
              <p>{btn.name}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default SidePanel;
