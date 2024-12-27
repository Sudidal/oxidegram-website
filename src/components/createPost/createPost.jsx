import { useState, useContext, useRef } from "react";
import api from "../../../api.js";
import profileContext from "../../contexts/profileContext.js";
import modalContext from "../../contexts/modalContext.js";
import alertContext from "../../contexts/alertContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import classes from "./createPost.module.css";

function CreatePost() {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [demoUrl, setDemoUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(null);
  const profile = useContext(profileContext);
  const modal = useContext(modalContext);
  const alert = useContext(alertContext);
  const fileInputRef = useRef(null);
  const contentInputRef = useRef(null);

  function stepOn() {
    setStep(step + 1);
  }
  function stepBack() {
    setStep(step - 1);
  }

  function share() {
    stepOn();
    api
      .makePost({
        content: contentInputRef.current.value,
        file: file,
      })
      .then((res) => {
        alert.show(res.msg);
        if (res.ok) modal.close();
      });
  }

  function upload(ev) {
    const file = ev.target.files[0];
    const url = URL.createObjectURL(file);
    setDemoUrl(url);
    setFile(file);
    stepOn();
  }

  function demoFail() {
    setIsVideo(true);
  }

  if (step === 0) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h2 className={classes.headerText}>Create new post</h2>
        </div>
        <div className={classes.body}>
          <SvgFileToInline path={"/icons/media.svg"} />
          <p className={classes.text}>Select only photos not videos</p>
          <form action="" encType="multipart/form-data">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*, video/*"
              style={{ display: "none" }}
              onChange={upload}
            />
          </form>
          <button
            className="primary-btn"
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            Select from computer
          </button>
        </div>
      </div>
    );
  } else if (step === 1) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div onClick={stepBack}>
            <SvgFileToInline path={"/icons/leftArrow.svg"} />
          </div>
          <h2 className={classes.headerText}>Create new post</h2>
          <button className="no-border-btn" onClick={share}>
            Share
          </button>
        </div>
        <div className={classes.body2}>
          <div className={classes.left}>
            {isVideo ? (
              <video className={classes.demo} src={demoUrl} controls></video>
            ) : (
              <img
                className={classes.demo}
                src={demoUrl}
                onError={demoFail}
                alt=""
              />
            )}
          </div>
          <div className={classes.right}>
            <div className={classes.profileInfo}>
              <AvatarImg url={profile.avatarUrl} width={28} />
              <p className="semibold-text">{profile.username}</p>
            </div>
            <textarea ref={contentInputRef} className={classes.contentInput} />
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
