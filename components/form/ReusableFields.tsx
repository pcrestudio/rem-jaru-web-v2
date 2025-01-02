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
          name={field.name}
          type={field.type}
          isInvalid={inputValid[field.name]}
          label={field.label}
          defaultValue={field.value}
          isRequired={field.required}
          onChange={onInputChange}
          onBlur={onBlurChange}
          errorMessage={errors[field.name]}
        />
      ))}
    </div>
  );
};

export default ReusableFields;
