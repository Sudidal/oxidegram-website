import PropTypes from "prop-types";
import classes from "./avatarImg.module.css"

function AvatarImg({ url, width = 50 }) {
  return <img style={{width: width + "px"}} className={classes.icon} src={url} alt="profile avatar" title="profile avatar" />;
}

AvatarImg.propTypes = {
  url: PropTypes.string,
  width: PropTypes.number
}

export default AvatarImg