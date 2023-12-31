import { parseISO, formatDistanceToNow } from "date-fns";
import { utcToZonedTime, format } from "date-fns-tz";
import React from "react";

interface TimeAgoProps {
  timestamp: string;
}
export const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const options = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let timeAgo = "";
  if (timestamp) {
    const utcTimestamp = timestamp + "Z";

    const utcDate = parseISO(utcTimestamp);

    const localTime = utcToZonedTime(utcDate, options);

    const tunisFormatted = format(localTime, "yyyy-MM-dd HH:mm:ss.SSSSSSXXX", {
      timeZone: options,
    });
    const d = parseISO(tunisFormatted);
    const timePeriod = formatDistanceToNow(d);
    timeAgo = `${timePeriod} ago`;
  }

  return <p className={"text-xs text-textGray"}> {timeAgo}</p>;
};
