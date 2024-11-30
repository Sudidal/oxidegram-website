import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import { sameDate } from "../../../utils/sameDate.js";
import { simpleDateAndTime } from "../../../utils/simpleDateAndTime.js";
import classes from "./chat.module.css";

function Chat({ contact }) {
  const bodyRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollBy(0, bodyRef.current.scrollHeight);
    }
  }, [contact]);

  if (!contact) {
    return (
      <div className="centered-flexbox-vertical">
        <SvgFileToInline path={"/icons/messengerInBorder.svg"} />
        <p className="huge-text">Your messages</p>
        <div className="secon-text">Select a chat to start messaging</div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <AvatarImg width={44} url={contact.contacted.avatarUrl} />
        <div className="big-text semibold-text">
          {contact.contacted.fullName}
        </div>
      </div>
      <div ref={bodyRef} className={classes.body}>
        <div className={classes.infoBox}>
          <AvatarImg width={96} url={contact.contacted.avatarUrl} />
          <div className="huge-text semibold-text">
            {contact.contacted.fullName}
          </div>
          <div className="secon-text">
            {contact.contacted.username} . Oxidegram
          </div>
          <button
            className="secondary-btn"
            onClick={() => {
              nav(`/profiles/${contact.contacted.id}`);
            }}
          >
            View profile
          </button>
        </div>
        <div className={classes.msgsList}>
          {contact.chat.messages.map((message, i) => {
            const prevMessage = contact.chat.messages[i - 1];
            return (
              <>
                {(!prevMessage ||
                  !sameDate(message.sendDate, prevMessage.sendDate)) && (
                  <p className={classes.date} key={message.id + "new"}>
                    {simpleDateAndTime(message.sendDate)}
                  </p>
                )}
                <div
                  className={`${classes.msg} ${
                    message.senderId === contact.profileId
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
      </div>
      <div className={classes.bottom}>
        <input
          type="text"
          className={classes.inputField}
          placeholder="Message..."
        />
        <SvgFileToInline path={"/icons/heart.svg"} />
      </div>
    </div>
  );
}

Chat.propTypes = {
  contact: PropTypes.object,
};

export default Chat;
