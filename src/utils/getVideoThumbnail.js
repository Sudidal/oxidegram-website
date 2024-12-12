function getVideoThumbnail(src, callback) {
  const video = document.createElement("video");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  video.src = src;
  video.crossOrigin = "anonymous";
  video.play();

  video.requestVideoFrameCallback(() => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);
    video.src = "";
    callback(canvas.toDataURL("image/png"));
  });
}

export { getVideoThumbnail };
