import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { DatePicker } from "@nextui-org/react";

import { convertToZonedDateTime } from "@/utils/format_date";

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
        control={control}
        defaultValue={
          defaultValue ? convertToZonedDateTime(defaultValue) : null
        }
        name={name}
        render={({ field }) => (
          <DatePicker
            className={className}
            isRequired={isRequired}
            label={label}
            {...field}
            errorMessage={errorMessage}
            value={field.value}
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
