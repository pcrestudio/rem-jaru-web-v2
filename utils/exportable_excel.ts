import { getLocalTimeZone, today } from "@internationalized/date";

const exportableExcel = (response: any) => {
  try {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    const now = today(getLocalTimeZone());
    const timestamp = `${now.year}${String(now.month).padStart(2, "0")}${String(now.day).padStart(2, "0")}_${String(new Date().getHours()).padStart(2, "0")}${String(new Date().getMinutes()).padStart(2, "0")}`;
    const fileName = `FICHA_${timestamp}`.toUpperCase();

    link.href = url;
    link.setAttribute("download", `${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);

    window.URL.revokeObjectURL(url);

    return "ok";
  } catch (error) {}
};

export default exportableExcel;
