import { useRef } from "react";
import PropTypes from "prop-types";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import dateOps from "../../utils/dateOps.js";
import classes from "./contactsList.module.css";

function ContactsList({ contacts, onSelect }) {
  const parentRef = useRef(null);

  function cardClicked(contactId, ev) {
    parentRef.current.childNodes.forEach((child) => {
      child.classList.remove(classes.selected);
    });
    ev.currentTarget.classList.add(classes.selected);
    onSelect(contactId);
  }

  return (
    <div ref={parentRef} className={classes.container}>
      {contacts.length > 0 ? (
        contacts.map((contact) => {
          const lastMessage =
            contact.chat.messages[contact.chat.messages.length - 1];
          const content = lastMessage.content.match(/^POST_ID_*/)
            ? "Sent an attachment"
            : lastMessage.content;
          return (
            <div
              key={contact.id}
              className={classes.contactCard}
              onClick={(ev) => {
                cardClicked(contact.id, ev);
              }}
            >
              <AvatarImg url={contact.contacted.avatarUrl} width={56} />
              <div>
                <div>{contact.contacted.fullName}</div>
                {lastMessage && (
                  <div className="secon-text small-text">
                    {content} .{" "}
                    {dateOps.getAgeFromIsoString(lastMessage.sendDate)}
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="semibold-text">You don&apos;t have any contacts yet.</p>
      )}
    </div>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

export default ContactsList;
