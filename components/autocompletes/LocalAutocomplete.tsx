"use client";

import React, { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
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
  noModal,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          className={className}
          getOptionLabel={(option) => option.label || ""}
          isOptionEqualToValue={(option, value) => option === value}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              className={noModal ? "nextui-input" : ""}
              error={!!error}
              helperText={error ? error.message : ""}
              label={label}
              required={isRequired}
              size="medium"
              variant="filled"
            />
          )}
          sx={autocompleteStyle}
          value={
            value && options
              ? options.find((option) => option.value === value)
              : null
          }
          onChange={(_, newValue) => onChange(newValue ? newValue.value : "")}
        />
      )}
    />
  );
};

export default LocalAutocomplete;
