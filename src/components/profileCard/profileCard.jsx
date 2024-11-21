import PropTypes from "prop-types";
import classes from "./profileCard.module.css";
import AvatarImg from "../avatarImg/avatarImg.jsx";

function ProfileCard({ profile }) {
  return (
    <div className={classes.card}>
      <div className={classes.left}>
        <AvatarImg url={profile.avatarUrl} width={44} />
        <div>
          <p className="prim-text">{profile.username}</p>
          <p className="secon-text">{profile.firstName} {profile.lastName}</p>
        </div>
      </div>
      <div>
        <button className="no-border-btn small-text">Follow</button>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.object,
};

export default ProfileCard;
