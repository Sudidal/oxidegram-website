import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import { isInViewPort } from "../../utils/isInViewPort.js";
import classes from "./coolVideo.module.css";

function CoolVideo({ src, className }) {
  const [stopped, setStopped] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (stopped) return;
      setPlaying(isInViewPort(videoRef.current));
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [stopped]);

  function play() {
    setPlaying(true);
    setStopped(false);
  }
  function stop() {
    setPlaying(false);
    setStopped(true);
  }
  function reset() {
    // Setting playing to true won't rerender
    // so video wont do a play()
    videoRef.current.play();
  }

  function toggle() {
    if (playing) {
      stop();
    } else {
      play();
    }
  }

  if (videoRef.current) {
    if (playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  return (
    <div onClick={toggle} className={classes.container}>
      <video
        ref={videoRef}
        onEnded={reset}
        onCanPlay={play}
        className={className}
        src={src}
      ></video>
      {stopped && (
        <div className={classes.pauseIcon}>
          <SvgFileToInline path={"/icons/play.svg"} />
        </div>
      )}
    </div>
  );
}

CoolVideo.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};

export default CoolVideo;
