import { useState, useEffect, useContext } from "react";
import profileContext from "../../contexts/profileContext.js";
// import SidePanel from "../../components/sidePanel/sidePanel.jsx";
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
      api.getContactsOfOneProfile(profile.id).then((res) => {
        setDetailedProfile(res.profile);
      });
  }, [profile]);

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
  );
}

export default Messages;
