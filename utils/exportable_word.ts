import { getLocalTimeZone, today } from "@internationalized/date";

const exportableWord = async (response, entityReference: string) => {
  try {
    const sanitizeFileName = (name) => name.replace(/[<>:"/\\|?*]/g, "");
    const sanitizedEntityReference = sanitizeFileName(entityReference);

    const now = today(getLocalTimeZone());
    const timestamp = `${now.year}${String(now.month).padStart(2, "0")}${String(now.day).padStart(2, "0")}_${String(new Date().getHours()).padStart(2, "0")}${String(new Date().getMinutes()).padStart(2, "0")}`;
    const fileName = `${sanitizedEntityReference}_${timestamp}`.toUpperCase();

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `${fileName}.docx`);

    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);

    return "ok";
  } catch (error) {
    return error.message;
  }
};

export default exportableWord;
