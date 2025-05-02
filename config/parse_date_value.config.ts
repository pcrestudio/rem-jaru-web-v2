import { parseZonedDateTime, ZonedDateTime } from "@internationalized/date";

const parseValueToZonedDateTime = (value: any): ZonedDateTime | null => {
  if (!value || value === "") return null;

  try {
    if (typeof value === "string") {
      // Verifica si el valor es una fecha válida
      const date = new Date(value);

      // Verifica si la fecha es válida
      if (isNaN(date.getTime())) {
        console.error("Invalid date string:", value);
        return null;
      }

      // Convierte a formato ISO
      const iso = date.toISOString();
      return parseZonedDateTime(iso.replace("Z", "[UTC]"));
    }

    // Si el valor ya es un ZonedDateTime, lo retorna tal cual
    return value instanceof ZonedDateTime ? value : null;
  } catch (err) {
    console.error("Error parsing ZonedDateTime:", err);
    return null;
  }
};

export default parseValueToZonedDateTime;
