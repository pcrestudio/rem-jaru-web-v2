"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { FC } from "react";

const CargoStudioAutocomplete: FC<ReactiveFieldProps> = ({
  name,
  register,
  errors,
  label,
  defaultValue,
  defaultItems,
  placeholder,
  autocompleteLabel,
  autocompleteValue,
  isRequired,
  className,
}) => {
  return (
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
  );
};

export default CargoStudioAutocomplete;
