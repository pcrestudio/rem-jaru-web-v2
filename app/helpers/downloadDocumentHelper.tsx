import { exportDocument } from "@/app/api/instances/instances";

export const handleDownloadDocument = async (fileName: string) => {
  const response = await exportDocument(fileName);

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
};
