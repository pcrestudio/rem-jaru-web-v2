const validateFileCode = (value: string): string | null => {
  const fileCodeRegex: RegExp = /^\d{5}-\d{4}-0-\d+-[A-Z]+-[A-Z]+-\d{2}$/;

  return fileCodeRegex.test(value) ? null : "Invalid file code";
};

export default validateFileCode;
