import { ZonedDateTime } from "@internationalized/date";

import { convertToZonedDateTime } from "@/utils/format_date";

const parseValueToZonedDateTime = (value: any): ZonedDateTime | null => {
  if (typeof value === "string") {
    return convertToZonedDateTime(value);
  }

  return value instanceof ZonedDateTime ? value : null;
};

export default parseValueToZonedDateTime;
