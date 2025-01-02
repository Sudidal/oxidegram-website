class DateOps {
  constructor() {}

  getAgeFromIsoString(str, short = true) {
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

  isSameDate(isoString1, isoString2) {
    const date1 = new Date(isoString1);
    const date2 = new Date(isoString2);
    if (date1.toDateString() === date2.toDateString()) {
      return true;
    }
    return false;
  }

  isoToBeautyDateAndTime(isoString) {
    const date = new Date(isoString);
    console.log(date);
    const hour = this.to12HoursFormat(date.getHours());
    let result = "";

    result =
      this.getMonthNameShort(date.getMonth()) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear() +
      ", " +
      hour[0] +
      ":" +
      this.alwaysTwoChars(date.getMinutes()) +
      " " +
      hour[1];

    console.log(result);

    return result;
  }

  to12HoursFormat(hours24) {
    console.log(hours24);
    if (hours24 === 0) hours24 = 12;
    if (hours24 > 12) {
      return [hours24 - 12, "PM"];
    } else {
      return [hours24, "AM"];
    }
  }

  getMonthNameShort(monthNumber) {
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

    return shortNames[parseInt(monthNumber)];
  }

  alwaysTwoChars(input) {
    let result = input

    if (typeof result !== "string") {
      result = result.toString();
    }
    if (result.length === 1) {
      return "0" + result;
    }
    
    return result;
  }
}

const dateOps = new DateOps();
export default dateOps;
