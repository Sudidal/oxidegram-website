function simpleDateAndTime(isoString) {
  const date = new Date(isoString);
  const hour = hours12Format(date.getHours());
  let result = "";

  result =
    monthNameShort(date.getMonth()) +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear() +
    ", " +
    hour[0] +
    ":" +
    date.getMinutes() +
    " " +
    hour[1];

  return result;
}

function hours12Format(hours24) {
  if (hours24 > 12) {
    return [hours24 - 12, "PM"];
  } else {
    return [hours24, "AM"];
  }
}

function monthNameShort(month) {
  const shortNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return shortNames[parseInt(month) - 1];
}

export { simpleDateAndTime };
