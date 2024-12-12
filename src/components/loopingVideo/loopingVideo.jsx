import { useRef, useState } from "react";
import PropTypes from "prop-types";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import classes from "./loopingVideo.module.css";

function LoopingVideo({ src, className }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  function play() {
    setPlaying(true);
  }
  function stop() {
    setPlaying(false);
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
        onEnded={play}
        onCanPlay={play}
        className={className}
        // controls={controls}
        src={src}
      ></video>
      {!playing && (
        <div className={classes.pauseIcon}>
          <SvgFileToInline path={"/icons/play.svg"} />
        </div>
      )}
    </div>
  );
}

LoopingVideo.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};

export default LoopingVideo;
