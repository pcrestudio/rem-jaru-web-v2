import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { DatePicker } from "@heroui/react";
import { ZonedDateTime } from "@internationalized/date";

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
  isReadOnly?: boolean;
}

const ReactiveDatePicker: FC<ReactiveFieldProps> = ({
  name,
  errors,
  label,
  isRequired,
  touched,
  className,
  control,
  isReadOnly,
}) => {
  const errorMessage = touched && errors[name] ? errors[name].message : "";

  const parseValueToZonedDateTime = (value: any): ZonedDateTime | null => {
    if (typeof value === "string") {
      return convertToZonedDateTime(value);
    }

    return value instanceof ZonedDateTime ? value : null;
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            {...field}
            className={className}
            errorMessage={errorMessage}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
            label={label}
            value={parseValueToZonedDateTime(field.value) as any}
            onChange={(newValue) => {
              const parsedDate =
                newValue instanceof ZonedDateTime
                  ? newValue
                  : convertToZonedDateTime(newValue as any);

              if (parsedDate) {
                field.onChange(parsedDate);
              }
            }}
          />
        )}
      />
    </>
  );
};

export default ReactiveDatePicker;
