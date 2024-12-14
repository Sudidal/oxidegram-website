import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import profileContext from "../../contexts/profileContext.js";
import modalContext from "../../contexts/modalContext.js";
import ShareMenu from "../shareMenu/shareMenu.jsx";
import api from "../../../api.js";
import classes from "./postOptions.module.css";

function PostOptions({ post }) {
  const profile = useContext(profileContext);
  const modal = useContext(modalContext);
  const nav = useNavigate();

  const deletable = profile.id === post.author.id;
  const postUrl = api.getUrlOfPost(post.id);

  return (
    <div className={classes.container}>
      {deletable && (
        <button className={`unstyled-btn danger ${classes.btn}`} onClick={() => {
          api.deletePost(post.id)
        }}>Delete</button>
      )}
      <button
        className={`unstyled-btn ${classes.btn}`}
        onClick={() => [nav(postUrl)]}
      >
        Go to post
      </button>
      <button
        className={`unstyled-btn ${classes.btn}`}
        onClick={() => {
          modal.open(<ShareMenu post={post} />);
        }}
      >
        Share
      </button>
      <button
        className={`unstyled-btn ${classes.btn}`}
        onClick={() => {
          navigator.clipboard.writeText(postUrl);
          modal.close();
        }}
      >
        Copy link
      </button>
      <button className={`unstyled-btn ${classes.btn}`} onClick={modal.close}>
        Cancel
      </button>
    </div>
  );
}

PostOptions.propTypes = {
  post: PropTypes.object,
};

export default PostOptions;
