import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import profileContext from "../../contexts/profileContext.js";
import modalContext from "../../contexts/modalContext.js";
import ShareMenu from "../shareMenu/shareMenu.jsx";
import ConfirmPopup from "../confirmPopup/confirmPopup.jsx";
import StackingBtn from "../stackingBtn/stackingBtn.jsx";
import api from "../../../api.js";
import classes from "./postOptions.module.css";

function PostOptions({ post }) {
  const profile = useContext(profileContext);
  const modal = useContext(modalContext);
  const nav = useNavigate();

  const deletable = profile.id === post.author.id;
  const {relativeUrl, absoluteUrl} = api.getUrlOfPost(post.id);

  return (
    <div className={classes.container}>
      {deletable && (
        <StackingBtn
          content={"Delete"}
          danger={true}
          onClick={() => {
            modal.open(
              <ConfirmPopup
                title="Delete Post"
                para={"Are you sure you want to delete this post"}
                actionTitle="Delete"
                action={() => {
                  api.deletePost(post.id);
                }}
              />
            );
          }}
        />
      )}
      <StackingBtn
        content={"Go to post"}
        onClick={() => {
          nav(relativeUrl);
        }}
      />
      <StackingBtn
        content={"Share"}
        onClick={() => {
          modal.open(<ShareMenu post={post} />);
        }}
      />
      <StackingBtn
        content={"Copy link"}
        onClick={() => {
          navigator.clipboard.writeText(absoluteUrl);
          modal.close();
        }}
      />
      <StackingBtn content={"Cancel"} onClick={modal.close} />
    </div>
  );
}

PostOptions.propTypes = {
  post: PropTypes.object,
};

export default PostOptions;
