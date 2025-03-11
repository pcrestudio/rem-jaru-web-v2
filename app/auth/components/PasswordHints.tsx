import React from "react";

function PasswordHints({ passwordValue }: { passwordValue: string }) {
  // Feel free to tailor these checks to your actual validation rules
  const hasMinLength = passwordValue.length >= 12;
  const hasUpperCase = /[A-Z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(passwordValue);

  return (
    <ul className="text-sm text-gray-600 mt-1 space-y-1">
      <li className={hasMinLength ? "text-green-600" : "text-red-600"}>
        * Mínimo 12 caracteres
      </li>
      <li className={hasUpperCase ? "text-green-600" : "text-red-600"}>
        * Al menos una mayúscula
      </li>
      <li className={hasNumber ? "text-green-600" : "text-red-600"}>
        * Al menos un número
      </li>
      <li className={hasSpecialChar ? "text-green-600" : "text-red-600"}>
        * Al menos un caracter especial
      </li>
    </ul>
  );
}

export default PasswordHints;
