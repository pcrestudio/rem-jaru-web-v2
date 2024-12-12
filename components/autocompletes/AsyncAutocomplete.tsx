"use client";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import React, { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
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
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          readOnly={disabled}
          options={items}
          getOptionLabel={(option) => option[itemLabel] || ""}
          value={
            value && items
              ? items.find((option) => option[itemValue] === value)
              : null
          }
          sx={autocompleteStyle}
          onChange={(_, newValue) =>
            onChange(newValue ? newValue[itemValue] : "")
          }
          className={className}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              required={isRequired}
              disabled={disabled}
              variant="filled"
              size="medium"
              className={noModal ? "nextui-input" : ""}
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

export default AsyncAutocomplete;
