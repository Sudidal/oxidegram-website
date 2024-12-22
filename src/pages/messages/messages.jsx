import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import Tabs from "../../components/tabs/tabs.jsx";
import api from "../../../api.js";
import ContactsList from "../../components/contactsList/contactsList.jsx";
import Chat from "../../components/chat/chat.jsx";
import classes from "./messages.module.css";

function Messages() {
  const [detailedProfile, setDetailedProfile] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const profile = useContext(profileContext);
  const onRender = useOutletContext();

  let selectedContact = null;

  onRender("collapse-panel");

  useEffect(() => {
    if (profile.id)
      api.getContacts(profile.id).then((res) => {
        setDetailedProfile(res.profile);
      });
  }, [profile]);

  api.onMessageReceive((msg) => {
    const contactsArr = detailedProfile.contacts;
    contactsArr.forEach((cont) => {
      if (cont.chat.id === msg.chatId) {
        cont.chat.messages.push(msg);
        if (msg.senderId !== profile.id) {
          new window.Notification(`Message from ${cont.contacted.fullName}`, {
            body: msg.content,
            icon: cont.contacted.avatarUrl,
          });
        }
      }
    });

    setDetailedProfile({ ...detailedProfile, contacts: contactsArr });
  });

  function selectContact(contactId) {
    setSelectedContactId(contactId);
  }

  if (detailedProfile) {
    detailedProfile.contacts.forEach((cont) => {
      if (cont.id === selectedContactId) {
        selectedContact = cont;
      }
    });
  }

  if (!detailedProfile) return;

  return (
    <div className={classes.container}>
      <div className={`${classes.main} main-with-margin`}>
        <div className={classes.left}>
          <Tabs
            bottomBorder={true}
            tabs={[
              {
                name: "Primary",
                content: (
                  <ContactsList
                    contacts={detailedProfile.contacts}
                    onSelect={selectContact}
                  />
                ),
              },
            ]}
          />
        </div>
        <div className={classes.right}>
          <Chat contact={selectedContact} />
        </div>
      </div>
    </div>
  );
}

export default Messages;
