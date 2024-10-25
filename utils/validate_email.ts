// Función para validar emails
const validateEmail = (email: string): string | null => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email) ? null : "Invalid email format";
};

export default validateEmail;
