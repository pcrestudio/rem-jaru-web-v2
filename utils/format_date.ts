import { parseZonedDateTime, ZonedDateTime } from "@internationalized/date";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const format = (date: Date) => {
  const getDate = new Date(date.toString());

  return getDate.toLocaleString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

export default format;

export function convertToZonedDateTime(
  dateString: string,
): ZonedDateTime | null {
  const date = new Date(dateString);

  if (date instanceof Date && !isNaN(date.getTime())) {
    const utcDate = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
      ),
    );

    return new ZonedDateTime(
      utcDate.getUTCFullYear(),
      utcDate.getUTCMonth() + 1,
      utcDate.getUTCDate(),
      "UTC",
      0,
      utcDate.getUTCHours(),
      utcDate.getUTCMinutes(),
      utcDate.getUTCSeconds(),
    );
  }

  return null;
}

export function convertToZonedDateTimeForInstance(
  dateString: string,
): ZonedDateTime | null {
  const date = new Date(dateString);

  if (date instanceof Date && !isNaN(date.getTime())) {
    return parseZonedDateTime(new Date(dateString).toISOString());
  }

  return null;
}

export function convertFormatDistanceToNow(date: Date) {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: es,
  });
}
