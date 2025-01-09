"use client";

import { ChangeEvent, FC, FocusEvent } from "react";
import { Input } from "@nextui-org/input";

interface CustomFormProps {
  fields: CustomFormField[];
  inputValid: Record<string, boolean>;
  errors: Record<string, string>;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlurChange: (event: FocusEvent<HTMLInputElement>) => void;
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

const ReusableFields: FC<CustomFormProps> = ({
  fields,
  inputValid,
  errors,
  onInputChange,
  onBlurChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <Input
          key={index}
          defaultValue={field.value}
          errorMessage={errors[field.name]}
          isInvalid={inputValid[field.name]}
          isRequired={field.required}
          label={field.label}
          name={field.name}
          type={field.type}
          onBlur={onBlurChange}
          onChange={onInputChange}
        />
      ))}
    </div>
  );
};

export default ReusableFields;
