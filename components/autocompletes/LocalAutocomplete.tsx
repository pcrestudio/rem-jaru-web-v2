"use client";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import React, { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { autocompleteStyle } from "@/theme/autocompleteStyle";

export interface LocalAutocompleteProps extends ReactiveFieldProps {
  options: LocalAutocompleteOption[];
}

export interface LocalAutocompleteOption {
  label: string;
  value: string;
}

const LocalAutocomplete: FC<LocalAutocompleteProps> = ({
  name,
  label,
  className,
  control,
  isRequired,
  options,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          options={options}
          getOptionLabel={(option) => option.label || ""}
          value={
            value && options
              ? options.find((option) => option.value === value)
              : null
          }
          sx={autocompleteStyle}
          onChange={(_, newValue) => onChange(newValue ? newValue.value : "")}
          className={className}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              required={isRequired}
              variant="filled"
              size="medium"
              className="nextui-input"
              label={label}
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        ></Autocomplete>
      )}
    ></Controller>
  );
};

export default LocalAutocomplete;
