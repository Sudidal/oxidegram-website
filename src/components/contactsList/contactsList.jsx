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
          const messages = contact.chat.messages;
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
                {messages[messages.length - 1] && (
                  <div className="secon-text small-text">
                    {messages[messages.length - 1].content} .{" "}
                    {dateOps.getAgeFromIsoString(messages[messages.length - 1].sendDate)}
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>You don&apos;t have contacts yet.</p>
      )}
    </div>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

export default ContactsList;
