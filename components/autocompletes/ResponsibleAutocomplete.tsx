"use client";

import React, { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import useSWR from "swr";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { autocompleteStyle } from "@/theme/autocompleteStyle";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { CustomDataGridPagination } from "@/app/admin/types/CustomDataGridPagination";

const ResponsibleAutocomplete: FC<ReactiveFieldProps> = ({
  name,
  label,
  className,
  control,
  isRequired,
  defaultValue,
  disabled,
  noModal,
}) => {
  const { data } = useSWR<CustomDataGridPagination<GetUserDto>>(
    `${environment.baseUrl}/auth/users`,
    fetcher,
  );

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          className={className}
          getOptionLabel={(option) =>
            `${option.firstName} ${option.lastName}` || ""
          }
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={data ? data?.results : []}
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
            value && data
              ? data?.results.find((option) => option.id === value)
              : null
          }
          onChange={(_, newValue) => onChange(newValue ? newValue.id : "")}
        />
      )}
    />
  );
};

export default ResponsibleAutocomplete;
