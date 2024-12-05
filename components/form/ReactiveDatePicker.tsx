import React, { FC, useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Control, Controller, set } from "react-hook-form";
import { convertToZonedDateTime } from "@/utils/format_date";
import { DatePicker } from "@nextui-org/react";

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
}

const ReactiveDatePicker: FC<ReactiveFieldProps> = ({
  name,
  errors,
  label,
  defaultValue,
  isRequired,
  touched,
  className,
  control,
}) => {
  const errorMessage = touched && errors[name] ? errors[name].message : "";

  return (
    <>
      <Controller
        name={name}
        defaultValue={
          defaultValue ? convertToZonedDateTime(defaultValue) : null
        }
        control={control}
        render={({ field }) => (
          <DatePicker
            className={className}
            isRequired={isRequired}
            label={label}
            {...field}
            value={field.value}
            errorMessage={errorMessage}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
          />
        )}
      />
    </>
  );
};

export default ReactiveDatePicker;
