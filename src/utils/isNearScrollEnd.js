function isNearScrollEnd() {
  const height = document.body.scrollHeight;
  const curScroll = window.scrollY;
  const windowHeight = window.innerHeight;

  if (curScroll >= height - windowHeight * 3) {
    return true;
  }
  return false;
}

export { isNearScrollEnd };
