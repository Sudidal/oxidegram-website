import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import profileContext from "../../contexts/profileContext.js";
import modalContext from "../../contexts/modalContext.js";
import api from "../../../api.js";
import ProfileCard from "../profileCard/profileCard.jsx";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import classes from "./shareMenu.module.css";

function ShareMenu({ post }) {
  const profile = useContext(profileContext);
  const modal = useContext(modalContext)
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    api
      .getContacts(profile.id)
      .then((res) => [setContacts(res.profile.contacts)]);
  }, [profile]);

  function share(contact) {
    api.sendMessage("POST_ID_" + post.id, contact.chat.id, contact.contactedId);
  }

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.headBlock}></div>
        <h1 className={classes.header}>Share</h1>
        <button className={`unstyled-btn ${classes.headBlock}`} onClick={modal.close}>
          <SvgFileToInline path={"/icons/cross.svg"} />
        </button>
      </div>
      <div className={classes.list}>
        {contacts &&
          contacts.map((contact) => {
            return (
              <ProfileCard
                key={contact.id}
                profile={contact.contacted}
                sideBtn={{
                  title: "Send",
                  onClick: () => {
                    share(contact);
                  },
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

ShareMenu.propTypes = {
  post: PropTypes.object
}

export default ShareMenu;
