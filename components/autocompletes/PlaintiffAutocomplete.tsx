"use client";

import React, { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import useSWR from "swr";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { autocompleteStyle } from "@/theme/autocompleteStyle";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import {
  GetMasterOptionAutoComplete,
  GetMasterOptionsDto,
} from "@/app/dto/masters/get-master-options.dto";
import { MasterOptionConfig } from "@/config/master-option.config";

const PlaintiffAutocomplete: FC<ReactiveFieldProps> = ({
  name,
  label,
  className,
  control,
  isRequired,
  defaultValue,
  disabled,
  noModal,
  multiple,
  touched,
  errors,
}) => {
  const { data } = useSWR<GetMasterOptionAutoComplete[]>(
    `${environment.baseUrl}/masters/options/autocomplete`,
    fetcher,
  );

  const list = data?.find(
    (master) => master.slug === MasterOptionConfig.demandantes,
  );

  const errorMessage = touched && errors[name] ? errors[name].message : "";

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          className={className}
          getOptionLabel={(option: GetMasterOptionsDto) => option.name || ""}
          isOptionEqualToValue={(option, value) => {
            if (multiple) {
              return (
                (option as GetMasterOptionsDto).id ===
                (value as GetMasterOptionsDto).id
              );
            } else {
              return (
                (option as GetMasterOptionsDto).id ===
                (value as GetMasterOptionsDto).id
              );
            }
          }}
          multiple={multiple}
          options={list ? list.masterOption : []}
          readOnly={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              className={noModal ? "nextui-input" : ""}
              disabled={disabled}
              helperText={errorMessage}
              label={label}
              required={isRequired}
              size="medium"
              variant="filled"
            />
          )}
          size="small"
          sx={autocompleteStyle}
          value={
            value && data
              ? multiple
                ? list.masterOption.filter((option) =>
                    value.includes(option.id),
                  )
                : list.masterOption.find((option) => option.id === value)
              : multiple
                ? []
                : null
          }
          onChange={(
            _,
            newValue: GetMasterOptionsDto | GetMasterOptionsDto[],
          ) => {
            if (multiple) {
              onChange(
                Array.isArray(newValue) ? newValue.map((v) => v.id) : [],
              );
            } else {
              onChange(newValue ? (newValue as GetMasterOptionsDto).id : "");
            }
          }}
        />
      )}
    />
  );
};

export default PlaintiffAutocomplete;
