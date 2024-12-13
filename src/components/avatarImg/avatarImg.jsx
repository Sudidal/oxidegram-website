import PropTypes from "prop-types";
import classes from "./avatarImg.module.css";

function AvatarImg({ url, width = 50 }) {
  const fallbackUrl = "/photos/anon-avatar.png";

  if (!url) {
    url = fallbackUrl;
  }

  return (
    <div style={{ width: width + "px", height: width + "px" }}>
      <img
        className={classes.icon}
        src={url}
        onError={(ev) => {
          ev.target.src = fallbackUrl;
        }}
        title="profile avatar"
      />
    </div>
  );
}

AvatarImg.propTypes = {
  url: PropTypes.string,
  width: PropTypes.number,
};

export default AvatarImg;
