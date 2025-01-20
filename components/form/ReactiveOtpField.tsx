import { FC } from "react";
import { InputOtp } from "@nextui-org/input-otp";
import { Control, Controller } from "react-hook-form";

export interface ReactiveOtpFieldProps {
  name?: string;
  label?: string;
  defaultValue?: string | number | any;
  register?: any;
  errors?: any;
  placeholder?: string;
  isRequired?: boolean;
  touched?: boolean;
  className?: string;
  control?: Control<any>;
  disabled?: boolean;
  onBlur?: (value: any) => void;
  noModal?: boolean;
  [key: string]: any;
}

const ReactiveOtpField: FC<ReactiveOtpFieldProps> = ({
  name,
  errors,
  label,
  defaultValue,
  isRequired,
  touched,
  className,
  control,
  onBlur,
  ...rest
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
            <InputOtp
              aria-label="OTP input field"
              className={className}
              errorMessage={errorMessage}
              isInvalid={!!errors[name] && touched}
              isRequired={isRequired}
              length={6}
              placeholder={label || "Enter code"}
              value={field.value}
              onBlur={handleBlur}
              onValueChange={(value) => field.onChange(value)}
              {...rest}
            />
          );
        }}
      />
    </>
  );
};

export default ReactiveOtpField;
