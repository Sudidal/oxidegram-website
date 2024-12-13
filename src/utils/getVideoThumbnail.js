function getVideoThumbnail(src, callback) {
  const video = document.createElement("video");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  video.src = src;
  video.crossOrigin = "anonymous";
  video.play();

  video.onloadeddata = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    cleanUp();

    callback(canvas.toDataURL("image/png"));
  };
  video.onerror = () => {
    cleanUp();
  };

  function cleanUp() {
    video.src = "";
    video.load();
    video.onloadeddata = null;
    video.onerror = null;
  }
}

export { getVideoThumbnail };
