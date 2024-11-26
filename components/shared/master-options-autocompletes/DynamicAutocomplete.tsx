"use client";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import React, { FC } from "react";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { Autocomplete, TextField } from "@mui/material";
import {
  GetMasterOptionAutoComplete,
  GetMasterOptionsDto,
} from "@/app/dto/masters/get-master-options.dto";
import { Controller } from "react-hook-form";
import { autocompleteStyle } from "@/theme/autocompleteStyle";

export interface DynamicAutocompleteProps extends ReactiveFieldProps {
  slug: string;
  optionValue?: string;
}

const DynamicAutocomplete: FC<DynamicAutocompleteProps> = ({
  name,
  label,
  className,
  control,
  isRequired,
  slug,
  optionValue = "id",
}) => {
  const { data } = useSWR<GetMasterOptionAutoComplete[]>(
    `${environment.baseUrl}/masters/options/autocomplete`,
    fetcher,
  );

  const list = data?.find((master) => master.slug === slug);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          options={list ? list.masterOption : []}
          getOptionLabel={(option: GetMasterOptionsDto) => option.name || ""}
          value={
            value && list
              ? list.masterOption.find(
                  (option) => option[optionValue] === value,
                )
              : null
          }
          sx={autocompleteStyle}
          onChange={(_, newValue) =>
            onChange(newValue ? newValue[optionValue] : "")
          }
          className={className}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              required={isRequired}
              variant="filled"
              size="medium"
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

export default DynamicAutocomplete;
