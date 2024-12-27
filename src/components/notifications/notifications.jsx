import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import api from "../../../api.js";
import classes from "./notifications.module.css";

function Notifications() {
  const [notifs, setNotifs] = useState(null);
  const profile = useContext(profileContext);
  const nav = useNavigate();

  useEffect(() => {
    api.getNotifications(profile.id).then((res) => {
      notifsContent(res.profile.notifications).then((data) => {
        setNotifs(data);
      });
    });
  }, [profile]);

  async function notifsContent(input) {
    const result = [];
    console.log(input);
    for (let i = 0; i < input.length; i++) {
      const notif = input[i].notification;
      if (notif.type === "POST") {
        const { postId, authorId } = JSON.parse(notif.title);
        const author = (await api.getProfile(authorId)).profile;
        result.push({
          id: notif.id,
          icon: author.avatarUrl,
          content: "New post by " + author.username,
          link: api.getUrlOfPost(postId).relativeUrl
        });
      }
    }
    return result;
  }

  let count = 0;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className="huge-text">Notifications</h1>
      </div>
      {notifs?.length > 0 ? (
        <div className={classes.list}>
          {notifs.map((notif) => {
            return (
              <div className={classes.card} onClick={() => {
                nav(notif.link)
              }}>
                <AvatarImg url={notif.icon} width={46} />
                <p className="semibold-text">{notif.content}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
}

export default Notifications;

// I've spent 1.5 hours JUSTT TOO FIGUUREE OUTT THAT JSS STUPIDD FOREACH LOOP
// DOESN'T ALLOW NEITHER RETURN NOR AWAIT OPS, FUCKK YOUU JSSSS AT LEAST GIVE ME
// AN ERROR OR SOMETHING!!!!!!!!!!!!!!!!!!!!!!!!