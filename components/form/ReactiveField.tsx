import { FC } from "react";
import { Input } from "@nextui-org/input";
import { InputConfig } from "@/config/input-config";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";

export interface ReactiveFieldProps {
  name: string;
  label: string;
  defaultValue?: string | number | any;
  register?: any;
  errors?: any;
  type?: string;
  placeholder?: string;
  defaultItems?: any[];
  autocompleteValue?: string;
  autocompleteLabel?: string;
  isRequired?: boolean;
  touched?: boolean;
  className?: string;
  control?: Control<any>;
}

const ReactiveField: FC<ReactiveFieldProps> = ({
  name,
  register,
  errors,
  label,
  defaultValue,
  type,
  defaultItems,
  placeholder,
  autocompleteLabel,
  autocompleteValue,
  isRequired,
  touched,
  className,
  control,
}) => {
  const errorMessage = touched && errors[name] ? errors[name].message : "";

  return (
    <>
      {type === InputConfig.autocomplete && (
        <Autocomplete
          isRequired={isRequired}
          allowsCustomValue
          {...register(name)}
          isInvalid={!!errors[name]}
          errorMessage={errors[name]?.message}
          defaultValue={defaultValue}
          label={label}
          placeholder={placeholder}
          className={className}
          defaultItems={defaultItems}
        >
          {(item) => (
            <AutocompleteItem key={item[autocompleteValue]}>
              {item[autocompleteLabel]}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}

      {!type && (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Input
              isRequired={isRequired}
              label={label}
              {...field}
              isInvalid={!!errors[name] && touched}
              errorMessage={errorMessage}
              className={className}
              defaultValue={defaultValue}
            />
          )}
        />
      )}
    </>
  );
};

export default ReactiveField;
