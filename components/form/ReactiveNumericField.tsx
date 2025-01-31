import { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from "react";
import { Input } from "@heroui/input";
import { Control, Controller } from "react-hook-form";

export interface ReactiveFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: any;
  errors?: any;
  isRequired?: boolean;
  touched?: boolean;
  className?: string;
  labelClassName?: string;
  control?: Control<any>;
  onBlur?: (value: any) => void;
  onChange?: (value: any) => void;
  noModal?: boolean;
  endContent?: ReactNode;
}

const ReactiveNumericField: FC<ReactiveFieldProps> = ({
  name,
  errors,
  label,
  defaultValue,
  isRequired,
  touched,
  className,
  disabled,
  control,
  onBlur,
  onChange,
  endContent,
  min,
  max,
  labelClassName,
}) => {
  const errorMessage = touched && errors[name] ? errors[name].message : "";

  return (
    <>
      <Controller
        control={control}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        render={({ field }) => {
          const handleBlur = () => {
            if (onBlur && field?.value !== undefined) {
              onBlur(field.value);
            }
            field.onBlur();
          };

          const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            if (/^-?\d*(\.\d*)?$/.test(value)) {
              field.onChange(value);

              if (onChange) {
                onChange(value);
              }
            }
          };

          return (
            <Input
              {...field}
              className={`${className} input-disabled`}
              classNames={{
                inputWrapper:
                  "bg-white shadow-none border border-slate-200 data-[hover=true]:bg-white data-[focus=true]:!bg-white",
                label: labelClassName,
              }}
              endContent={endContent}
              errorMessage={errorMessage}
              isDisabled={disabled}
              isInvalid={!!errors[name] && touched}
              isRequired={isRequired}
              label={label}
              max={max}
              min={min}
              step="any"
              type="number"
              value={field.value || ""}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          );
        }}
      />
    </>
  );
};

export default ReactiveNumericField;
