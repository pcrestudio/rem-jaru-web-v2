import { FC, ReactNode } from "react";
import { Input } from "@heroui/input";
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
  endContent,
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
            <Input
              {...field}
              className={className}
              classNames={{
                inputWrapper:
                  "bg-white shadow-none border border-slate-200 data-[hover=true]:bg-white data-[focus=true]:!bg-white",
              }}
              endContent={endContent}
              errorMessage={errorMessage}
              isInvalid={!!errors[name] && touched}
              isRequired={isRequired}
              label={label}
              min={0}
              type={type}
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
