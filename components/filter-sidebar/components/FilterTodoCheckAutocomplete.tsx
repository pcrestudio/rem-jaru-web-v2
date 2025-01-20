"use client";

import React, { FC, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { autocompleteStyle } from "@/theme/autocompleteStyle";
import { LocalAutocompleteOption } from "@/components/autocompletes/LocalAutocomplete";

export interface FilterTodoCheckAutocompleteProps extends ReactiveFieldProps {
  onChange: (event: any, value: string | number | object) => void;
  options: LocalAutocompleteOption[];
}

const FilterTodoCheckAutocomplete: FC<FilterTodoCheckAutocompleteProps> = ({
  name,
  label,
  className,
  isRequired,
  disabled,
  noModal,
  onChange,
  options,
}) => {
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const onAutocompleteChange = (value: number | string | object | any) => {
    const textField = textFieldRef.current;
    const customTarget = {
      target: {
        name: textField.name,
        value,
      },
    };

    onChange(customTarget, value);
  };

  return (
    <Autocomplete
      fullWidth
      className={className}
      getOptionLabel={(option) => `${option.label}` || ""}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      options={options ? options : []}
      readOnly={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          className={noModal ? "nextui-input" : ""}
          disabled={disabled}
          inputRef={textFieldRef}
          label={label}
          name={name}
          required={isRequired}
          size="medium"
          variant="filled"
        />
      )}
      sx={autocompleteStyle}
      onChange={(_, newValue) => onAutocompleteChange(newValue?.value)}
    />
  );
};

export default FilterTodoCheckAutocomplete;
