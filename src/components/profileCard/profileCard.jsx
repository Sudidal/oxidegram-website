import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import classes from "./profileCard.module.css";
import AvatarImg from "../avatarImg/avatarImg.jsx";

function ProfileCard({ profile, sideBtn }) {
  const nav = useNavigate();

  return (
    <div
      className={classes.card}
      onClick={() => {
        nav("/profiles/" + profile.id);
      }}
    >
      <div className={classes.left}>
        <AvatarImg url={profile.avatarUrl} width={44} />
        <div>
          <p className="prim-text">{profile.username}</p>
          <p className="secon-text">{profile.fullName}</p>
        </div>
      </div>
      <div>
        {sideBtn && (
          <button
            className="no-border-btn small-text"
            onClick={(ev) => {
              ev.stopPropagation();
              sideBtn.onClick(ev);
            }}
          >
            {sideBtn.title}
          </button>
        )}
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.object,
  sideBtn: PropTypes.object,
};

export default ProfileCard;
