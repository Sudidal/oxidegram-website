import { useContext } from "react";
import PropTypes from "prop-types";
import profileContext from "../../contexts/profileContext.js";
import dateOps from "../../utils/dateOps.js";
import classes from "./messagesList.module.css";

function MessagesList({ msgs }) {
  const profile = useContext(profileContext);

  if (!Array.isArray(msgs)) return null;

  return (
    <div className={classes.msgsList}>
      {msgs.map((message, i) => {
        const prevMessage = msgs[i - 1];
        return (
          <>
            {(!prevMessage ||
              !dateOps.isSameDate(message.sendDate, prevMessage.sendDate)) && (
              <p className={classes.date} key={message.id + "new"}>
                {dateOps.isoToBeautyDateAndTime(message.sendDate)}
              </p>
            )}
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
