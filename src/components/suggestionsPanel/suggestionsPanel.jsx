import React from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import ProfileCard from "../profileCard/profileCard.jsx";
import api from "../../../api.js";
import classes from "./suggestionsPanel.module.css";

function SuggestionsPanel() {
  const [topProfiles, setTopProfiles] = React.useState(null);
  const profile = React.useContext(profileContext);
  const nav = useNavigate();

  React.useEffect(() => {
    api.getTopProfiles().then((res) => {
      setTopProfiles(res.profiles);
    });
  }, []);

  return (
    <div className={classes.content}>
      {profile.id ? (
        <ProfileCard
          profile={profile}
          sideBtn={{
            title: "Log out",
            onClick: profile.logout,
          }}
        />
      ) : (
        <button
          className="primary-btn"
          style={{ width: "100%" }}
          onClick={() => {
            nav("/accounts");
          }}
        >
          Log in
        </button>
      )}
      <div className={classes.suggested}>
        <p className="secon-text-semibold">Suggested for you</p>
        <div className={classes.profileList}>
          {topProfiles &&
            topProfiles.map((prof) => {
              let btn = null;
              if (!prof.followed) {
                btn = {
                  title: "Follow",
                  onClick: (ev) => {
                    api.follow(prof.id).then((res) => {
                      if (!res.ok) alert.show(res.msg);
                    });
                    ev.target.remove();
                  },
                };
              }
              if (prof.id !== profile.id) {
                return (
                  <ProfileCard key={prof.id} profile={prof} sideBtn={btn} />
                );
              }
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
  );
}

export default SuggestionsPanel;
