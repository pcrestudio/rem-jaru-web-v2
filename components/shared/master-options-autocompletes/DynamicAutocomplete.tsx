"use client";

import React, { FC } from "react";
import useSWR from "swr";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import {
  GetMasterOptionAutoComplete,
  GetMasterOptionsDto,
} from "@/app/dto/masters/get-master-options.dto";
import { autocompleteStyle } from "@/theme/autocompleteStyle";

export interface DynamicAutocompleteProps extends ReactiveFieldProps {
  slug: string;
  optionValue?: string;
  filter?: object;
}

const DynamicAutocomplete: FC<DynamicAutocompleteProps> = ({
  name,
  label,
  className,
  control,
  isRequired,
  slug,
  optionValue = "id",
  noModal,
  filter,
  disabled,
}) => {
  const filterUrl = filter
    ? `${environment.baseUrl}/masters/options/autocomplete?slug=${slug}&slugSubmodule=${filter["slugSubmodule"]}`
    : `${environment.baseUrl}/masters/options/autocomplete`;

  const { data } = useSWR<GetMasterOptionAutoComplete[]>(filterUrl, fetcher);

  const list = data?.find((master) => master.slug === slug);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          suppressHydrationWarning
          className={className}
          disabled={disabled}
          getOptionLabel={(option: GetMasterOptionsDto) => option.name || ""}
          isOptionEqualToValue={(option, value) => option === value}
          options={list ? list.masterOption : []}
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
            value && list
              ? list.masterOption.find(
                  (option) => option[optionValue] === value,
                )
              : ""
          }
          onChange={(_, newValue) =>
            onChange(newValue ? newValue[optionValue] : "")
          }
        />
      )}
    />
  );
};

export default DynamicAutocomplete;
