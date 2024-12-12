function isInViewPort(elem) {
  if (!elem) return;
  const rect = elem.getBoundingClientRect();

  const halfHeight = rect.height / 2;

  const inViewPort =
    rect.top >= -halfHeight &&
    rect.bottom <=
      (window.innerHeight + halfHeight ||
        document.documentElement.clientHeight + halfHeight);

  return inViewPort;
}

export { isInViewPort };
