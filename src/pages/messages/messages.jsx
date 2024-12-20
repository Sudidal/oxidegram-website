import { useState, useEffect, useContext } from "react";
import profileContext from "../../contexts/profileContext.js";
import SidePanel from "../../components/sidePanel/sidePanel.jsx";
import Tabs from "../../components/tabs/tabs.jsx";
import api from "../../../api.js";
import ContactsList from "../../components/contactsList/contactsList.jsx";
import Chat from "../../components/chat/chat.jsx";
import classes from "./messages.module.css";

function Messages() {
  const [detailedProfile, setDetailedProfile] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const profile = useContext(profileContext);

  let selectedContact = null;

  useEffect(() => {
    if (profile)
      api.getContacts(profile.id).then((res) => {
        setDetailedProfile(res.profile);
      });
  }, [profile]);

  api.onMessageReceive((msg) => {
    const contactsArr = detailedProfile.contacts;
    contactsArr.forEach((cont) => {
      if (cont.chat.id === msg.chatId) {
        cont.chat.messages.push(msg);
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

  console.log("rerender");

  if (!detailedProfile) return;

  return (
    <div className={classes.container}>
      <SidePanel collapsed={true} />
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
