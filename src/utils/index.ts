/** @format */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; 

dayjs.extend(relativeTime);

export function isStringValid(str: any): boolean {
  if (typeof str === "string") {
    return str.trim().length > 0;
  }
  return false;
}

export function formatDate(timeStamp) {
  return dayjs(timeStamp).fromNow();
}
