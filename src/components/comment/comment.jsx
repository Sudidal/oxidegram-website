import PropTypes from "prop-types";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import classes from "./comment.module.css"

function Comment({ comment }) {
  return (
    <div className={classes.container}>
      <div>
        <AvatarImg url={comment.author.avatarUrl} width={32} />
      </div>
      <div>
        <p className="semibold-text inline-para margin-5-px">
          {comment.author.username}
        </p>
        <p className="inline-para">{comment.content}</p>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
};


export default Comment