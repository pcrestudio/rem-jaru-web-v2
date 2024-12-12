import { FC, useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Control, Controller, set } from "react-hook-form";

export interface ReactiveFieldProps {
  name?: string;
  label?: string;
  defaultValue?: string | number | any;
  register?: any;
  errors?: any;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  touched?: boolean;
  className?: string;
  control?: Control<any>;
  disabled?: boolean;
  onBlur?: (value: any) => void;
  noModal?: boolean;
}

const ReactiveField: FC<ReactiveFieldProps> = ({
  name,
  errors,
  label,
  defaultValue,
  type,
  isRequired,
  touched,
  className,
  control,
  onBlur,
}) => {
  const errorMessage = touched && errors[name] ? errors[name].message : "";

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          const handleBlur = (e: any) => {
            if (onBlur && field?.value !== undefined) {
              onBlur(field.value);
            }
            field.onBlur();
          };

          return (
            <Input
              {...field}
              isRequired={isRequired}
              label={label}
              type={type}
              isInvalid={!!errors[name] && touched}
              errorMessage={errorMessage}
              className={className}
              value={field.value || ""}
              onBlur={handleBlur}
              onChange={(e) => field.onChange(e.target.value)}
            />
          );
        }}
      />
    </>
  );
};

export default ReactiveField;
