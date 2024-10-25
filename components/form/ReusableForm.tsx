"use client";

import {
  ChangeEvent,
  FC,
  FormEvent,
  FocusEvent,
  useEffect,
  useState,
} from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import validateErrorMessages from "@/utils/validate_error_messages";

interface CustomFormProps {
  fields: CustomFormField[];
  onSubmit: (formData: Record<string, string>) => void;
}

export interface CustomFormField {
  name: string;
  value: string;
  type: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  validate?: (value: string) => string | null;
  messages?: Record<string, string>;
}

const ReusableForm: FC<CustomFormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  );

  const [errors, setErrors] = useState<
    Record<string, string | null | undefined>
  >(fields.reduce((acc, field) => ({ ...acc, [field.name]: null }), {}));

  const [touched, setTouched] = useState<Record<string, boolean>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: false }), {}),
  );

  const [inputValid, setInputValid] = useState<Record<string, boolean>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: false }), {}),
  );

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const validateInputForm = (
    field: CustomFormField | undefined,
    name: string,
    value: string,
  ) => {
    if (field?.validate) {
      const error = validateErrorMessages(field, value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));

      setInputValid((prevValid) => ({
        ...prevValid,
        [name]: error !== null,
      }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    const field = fields.find((f) => f.name === name);

    validateInputForm(field, name, value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    const field = fields.find((f) => f.name === name);

    validateInputForm(field, name, value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formData);
    }
  };

  useEffect(() => {
    const noErrors = Object.values(errors).every((error) => error === null);

    const allFieldsFilled = fields.every(
      (field) =>
        !field.required ||
        formData[field.name].trim() !== "" ||
        field.value !== "",
    );

    setIsFormValid(noErrors && allFieldsFilled);
  }, [formData, errors, fields]);

  useEffect(() => {
    const initialValues = fields.reduce((acc, field) => {
      return {
        ...acc,
        [field.name]: field.value,
      };
    }, {});

    setFormData({
      ...formData,
      ...initialValues,
    });
  }, [fields]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <Input
            key={index}
            name={field.name}
            type={field.type}
            isInvalid={inputValid[field.name]}
            label={field.label}
            defaultValue={field.value}
            isRequired={field.required}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors[field.name]}
          />
        ))}
      </div>
      <a
        href="#"
        className="flex justify-end text-[13px] underline text-cerulean-800"
      >
        ¿Olvidaste la contraseña?
      </a>
      <Button
        color="primary"
        type="submit"
        disabled={!isFormValid}
        className="w-full bg-cerulean-500 disabled:opacity-50 hover:bg-cerulean-600 disabled:cursor-not-allowed"
      >
        Iniciar sesión
      </Button>
    </form>
  );
};

export default ReusableForm;
