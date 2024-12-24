const exportableExcel = (response: any) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "users.xlsx");
  document.body.appendChild(link);
  link.click();

  link.parentNode.removeChild(link);

  return window.URL.revokeObjectURL(url);
};

export default exportableExcel;
