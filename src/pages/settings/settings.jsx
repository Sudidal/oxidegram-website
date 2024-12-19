import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import alertContext from "../../contexts/alertContext.js";
import SidePanel from "../../components/sidePanel/sidePanel.jsx";
import AvatarImg from "../../components/avatarImg/avatarImg.jsx";
import Footer from "../../components/footer/footer.jsx";
import api from "../../../api.js";
import classes from "./settings.module.css";

function Settings() {
  const profile = useContext(profileContext);
  const alert = useContext(alertContext);
  const fileInputRef = useRef(null);
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const websiteRef = useRef(null);
  const bioRef = useRef(null);
  const countryRef = useRef(null);
  const genderRef = useRef(null);
  const nav = useNavigate();

  function chooseFile() {
    fileInputRef.current.click();
  }

  function submit() {
    api
      .updateProfile({
        username: usernameRef.current.value,
        fullName: fullNameRef.current.value,
        websiteUrl: websiteRef.current.value,
        bio: bioRef.current.value,
        country: countryRef.current.value,
        gender: genderRef.current.value,
        avatar: fileInputRef.current.files
          ? fileInputRef.current.files[0]
          : undefined,
      })
      .then((res) => {
        alert.show(res.msg);
        if (res.ok) {
          nav("/");
        }
      });
  }

  return (
    <div>
      <SidePanel />
      <main className={`main-with-margin ${classes.main}`}>
        <form
          encType="multipart/form-data"
          onSubmit={(ev) => {
            ev.preventDefault();
            submit();
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*, video/*"
            hidden
            aria-hidden
          />
          <section className={classes.avatarSection}>
            <div className={classes.info}>
              <AvatarImg url={profile.avatarUrl} width={130} />
              <div className={classes.names}>
                <input
                  ref={usernameRef}
                  type="text"
                  className={classes.textInput}
                  defaultValue={profile.username}
                />
                <input
                  ref={fullNameRef}
                  type="text"
                  className={classes.textInput}
                  defaultValue={profile.fullName}
                />
              </div>
            </div>
            <button className="primary-btn" type="button" onClick={chooseFile}>
              Change photo
            </button>
          </section>
          <section className={classes.section}>
            <div className="full-width">
              <label className="semibold-text big-text" htmlFor="website">
                Website
              </label>
              <input
                ref={websiteRef}
                type="text"
                id="website"
                className={classes.textInput}
                placeholder="Website"
                defaultValue={profile.websiteUrl}
              />
            </div>
          </section>
          <section className={classes.section}>
            <div className="full-width">
              <label className="semibold-text big-text" htmlFor="bio">
                Bio
              </label>
              <input
                ref={bioRef}
                type="text"
                id="bio"
                className={classes.textInput}
                placeholder="Bio"
                defaultValue={profile.bio}
              />
            </div>
          </section>
          <section className={classes.section}>
            <div className="full-width">
              <label className="semibold-text big-text" htmlFor="country">
                Country
              </label>
              <input
                ref={countryRef}
                type="text"
                id="country"
                className={classes.textInput}
                placeholder="Country"
                defaultValue={profile.country}
              />
            </div>
          </section>
          <section className={classes.section}>
            <div className="full-width">
              <label className="semibold-text big-text" htmlFor="gender">
                Gender
              </label>
              <select ref={genderRef} id="gender" className={classes.textInput}>
                <option value="" hidden>
                  Alien
                </option>
                <option value="MALE" selected={profile.gender === "MALE"}>
                  Male
                </option>
                <option value="FEMALE" selected={profile.gender === "FEMALE"}>
                  Female
                </option>
              </select>
            </div>
          </section>
          <button className={`primary-btn ${classes.submitBtn}`} type="submit">
            Submit
          </button>
        </form>
        <Footer />
      </main>
    </div>
  );
}

export default Settings;
