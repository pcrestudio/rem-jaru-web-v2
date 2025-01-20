import React, { FC, ReactNode } from "react";
import { Textarea } from "@nextui-org/input";
import { Control, Controller } from "react-hook-form";

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
  endContent?: ReactNode;
}

const ReactiveTextArea: FC<ReactiveFieldProps> = ({
  name,
  errors,
  label,
  defaultValue,
  isRequired,
  touched,
  control,
  className,
  onBlur,
}) => {
  const errorMessage = touched && errors[name] ? errors[name].message : "";

  return (
    <>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => {
          const handleBlur = () => {
            if (onBlur && field?.value !== undefined) {
              onBlur(field.value);
            }
            field.onBlur();
          };

          return (
            <Textarea
              className={className}
              isRequired={isRequired}
              label={label}
              {...field}
              errorMessage={errorMessage}
              isInvalid={!!errors[name] && touched}
            />
          );
        }}
      />
    </>
  );
};

export default ReactiveTextArea;
