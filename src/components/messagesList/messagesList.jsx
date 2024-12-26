import { useContext } from "react";
import PropTypes from "prop-types";
import profileContext from "../../contexts/profileContext.js";
import dateOps from "../../utils/dateOps.js";
import PostMsg from "../postMsg/postMsg.jsx";
import classes from "./messagesList.module.css";

function MessagesList({ msgs }) {
  const profile = useContext(profileContext);

  if (!Array.isArray(msgs)) return null;

  return (
    <div className={classes.msgsList}>
      {msgs.map((message, i) => {
        const prevMessage = msgs[i - 1];
        const post = message.content.match(/^POST_ID_*/);
        const postId = parseInt(message.content.split("_")[2]);
        const date = dateOps.isoToBeautyDateAndTime(message.sendDate);
        const sameDate = dateOps.isSameDate(
          message.sendDate,
          prevMessage?.sendDate
        );

        return (
          <>
            {(!prevMessage || !sameDate) && (
              <p className={classes.date} key={message.id}>
                {date}
              </p>
            )}
            {post ? (
              <div
                className={`${classes.postMsg} ${
                  message.senderId === profile.id
                    ? classes.sent
                    : classes.received
                }`}
              >
                <PostMsg postId={postId} />
              </div>
            ) : (
              <div
                className={`${classes.msg} ${
                  message.senderId === profile.id
                    ? classes.sent
                    : classes.received
                }`}
                key={message.id}
              >
                {message.content}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

MessagesList.propTypes = {
  msgs: PropTypes.arrayOf(PropTypes.object),
};

export default MessagesList;
