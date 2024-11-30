function sameDate(isoString1, isoString2) {
  const date1 = new Date(isoString1);
  const date2 = new Date(isoString2);
  if (date1.toDateString() === date2.toDateString()) {
    return true;
  }
  return false;
}

export { sameDate };
