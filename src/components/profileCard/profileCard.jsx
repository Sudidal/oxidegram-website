import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import classes from "./profileCard.module.css";
import AvatarImg from "../avatarImg/avatarImg.jsx";

function ProfileCard({
  profile,
  sideBtn,
  imgSize = 44,
  username = true,
  fullName = true,
  primFullName = false,
}) {
  const nav = useNavigate();

  return (
    <div
      className={classes.card}
      onClick={() => {
        nav("/profiles/" + profile.id);
      }}
    >
      <div className={classes.left}>
        <AvatarImg url={profile.avatarUrl} width={imgSize} />
        <div>
          {username && <p className="semibold-text">{profile.username}</p>}
          {fullName && (
            <p className={primFullName ? "prim-text semibold-text" : "secon-text"}>
              {profile.fullName}
            </p>
          )}
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
  imgSize: PropTypes.number,
  username: PropTypes.bool,
  fullName: PropTypes.bool,
  primFullName: PropTypes.bool
};

export default ProfileCard;
