import React from "react";
import api from "../../../api.js";
import profileContext from "../../contexts/profileContext.js";
import alertContext from "../../contexts/alertContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import classes from "./createPost.module.css";

function CreatePost() {
  const [step, setStep] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [demoUrl, setDemoUrl] = React.useState(null);
  const [isVideo, setIsVideo] = React.useState(null);
  const profile = React.useContext(profileContext);
  const alert = React.useContext(alertContext);
  const fileInputRef = React.useRef(null);
  const contentInputRef = React.useRef(null);

  function stepOn() {
    setStep((val) => val + 1);
  }
  function stepBack() {
    setStep((val) => val - 1);
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
        if (res.ok) stepOn();
        else stepBack();
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
          <p className={classes.text}>Select photos and videos</p>
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
          <button className="icon-btn" onClick={stepBack}>
            <SvgFileToInline path={"/icons/leftArrow.svg"} />
          </button>
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
  } else if (step === 2) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.headerText}>Sharing</h1>
        </div>
        <div className={classes.body3}>
          <img
            style={{ width: "96px" }}
            src="/gifs/instagram-spinner.gif"
            alt=""
          />
        </div>
      </div>
    );
  } else if (step === 3) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.headerText}>Post shared</h1>
        </div>
        <div className={classes.body3}>
          <img src="/gifs/instagram-success.gif" alt="" />
          <p className="huge-text">Your post has been shared.</p>
        </div>
      </div>
    );
  }
}

export default CreatePost;
