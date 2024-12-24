"use client";

import React, { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { autocompleteStyle } from "@/theme/autocompleteStyle";

export interface AsyncAutocompleteProps extends ReactiveFieldProps {
  items: any[];
  itemLabel: string;
  itemValue: string;
}

const AsyncAutocomplete: FC<AsyncAutocompleteProps> = ({
  name,
  label,
  className,
  control,
  isRequired,
  items,
  itemLabel,
  itemValue,
  defaultValue,
  disabled,
  noModal,
}) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          className={className}
          getOptionLabel={(option) => option[itemLabel] || ""}
          isOptionEqualToValue={(option, value) => option === value}
          options={items}
          readOnly={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              className={noModal ? "nextui-input" : ""}
              disabled={disabled}
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
            value && items
              ? items.find((option) => option[itemValue] === value)
              : null
          }
          onChange={(_, newValue) =>
            onChange(newValue ? newValue[itemValue] : "")
          }
        />
      )}
    />
  );
};

export default AsyncAutocomplete;
