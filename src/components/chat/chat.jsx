import PropTypes from "prop-types";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api.js";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import MessagesList from "../messagesList/messagesList.jsx";
import ProfileCard from "../profileCard/profileCard.jsx";
import classes from "./chat.module.css";

function Chat({ contact }) {
  const msgInputRef = useRef(null);
  const nav = useNavigate();

  function sendMessage(text) {
    api.sendMessage(
      text,
      contact.chat.id,
      contact.contactedId
    );
  }

  function submit(ev) {
    ev.preventDefault();
    sendMessage(msgInputRef.current.value);
    msgInputRef.current.value = "";
  }

  function sendHeart() {
    sendMessage("❤️");
  }

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
        <div className="big-text prim-text">
          <ProfileCard
            profile={contact.contacted}
            username={false}
            primFullName={true}
          />
        </div>
      </div>
      <div className={classes.body}>
        <MessagesList msgs={contact.chat.messages} />
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
      </div>
      <div className={classes.bottom}>
        <form onSubmit={submit} className="full-width">
          <input
            ref={msgInputRef}
            type="text"
            className="unstyled-input full-width"
            placeholder="Message..."
          />
        </form>
        <button
          className="unstyled-btn"
          onClick={() => {
            sendHeart();
          }}
        >
          <SvgFileToInline path={"/icons/heart.svg"} />
        </button>
      </div>
    </div>
  );
}

Chat.propTypes = {
  contact: PropTypes.object,
};

export default Chat;
