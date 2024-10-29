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
