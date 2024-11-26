import { FC } from "react";
import { Input } from "@nextui-org/input";
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
}) => {
  const errorMessage = touched && errors[name] ? errors[name].message : "";

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            isRequired={isRequired}
            label={label}
            {...field}
            type={type}
            isInvalid={!!errors[name] && touched}
            errorMessage={errorMessage}
            className={className}
            defaultValue={defaultValue}
          />
        )}
      />
    </>
  );
};

export default ReactiveField;
