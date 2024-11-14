import { ZonedDateTime } from "@internationalized/date";

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
  const date = new Date(dateString); // Este es el valor de la base de datos (ej. "Thu, 14 Nov 2024 00:00:00 GMT")

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
