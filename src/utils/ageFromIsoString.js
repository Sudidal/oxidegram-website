function ageFromIsoString(str, short = true) {
  const curDate = new Date();
  const date = new Date(str);

  const msCur = curDate.getTime();
  const msPassed = date.getTime();

  const offsetMin = Math.round((msCur - msPassed) / 1000 / 60);

  if (offsetMin < 60) return offsetMin + (short ? "m" : " minutes ago");
  else if (offsetMin < 60 * 24)
    return Math.round(offsetMin / 60) + (short ? "h" : " hours ago");
  else if (offsetMin < 60 * 24 * 30)
    return Math.round(offsetMin / 60 / 24) + (short ? "d" : " days ago");
}

export default ageFromIsoString;
