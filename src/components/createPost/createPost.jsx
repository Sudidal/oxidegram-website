import { useState, useContext, useRef } from "react";
import api from "../../../api.js";
import profileContext from "../../contexts/profileContext.js";
import modalContext from "../../contexts/modalContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import AvatarImg from "../avatarImg/avatarImg.jsx";
import classes from "./createPost.module.css";

function CreatePost() {
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(0);
  const profile = useContext(profileContext);
  const modal = useContext(modalContext);
  const imageInputRef = useRef(null);
  const contentInputRef = useRef(null);

  function stepOn() {
    setStep(1);
  }
  function stepBack() {
    setStep(0);
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
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(ev) => {
                setFile(ev.target.files[0]);
                stepOn();
              }}
            />
          </form>
          <button
            className="primary-btn"
            onClick={() => {
              imageInputRef.current.click();
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
          <button
            className="no-border-btn"
            onClick={async () => {
              await api.makePost({
                content: contentInputRef.current.value,
                image: file,
              });
              modal.close();
            }}
          >
            Share
          </button>
        </div>
        <div className={classes.body2}>
          <div className={classes.left}>
            <img src="" alt="" />
          </div>
          <div className={classes.right}>
            <div className={classes.profileInfo}>
              <AvatarImg url={profile.avatarUrl} width={28} />
              <p className="prim-text">{profile.username}</p>
            </div>
            <textarea ref={contentInputRef} className={classes.contentInput} />
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
