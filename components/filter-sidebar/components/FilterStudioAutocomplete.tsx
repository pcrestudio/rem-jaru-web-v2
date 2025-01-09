"use client";

import React, { FC, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import useSWR from "swr";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { autocompleteStyle } from "@/theme/autocompleteStyle";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetMasterOptionAutoComplete } from "@/app/dto/masters/get-master-options.dto";
import { MasterOptionConfig } from "@/config/master-option.config";

export interface FilterProjectAutocompleteProps extends ReactiveFieldProps {
  onChange: (event: any, value: string | number | object) => void;
}

const FilterStudioAutocomplete: FC<FilterProjectAutocompleteProps> = ({
  name,
  label,
  className,
  isRequired,
  disabled,
  noModal,
  onChange,
}) => {
  const { data } = useSWR<GetMasterOptionAutoComplete[]>(
    `${environment.baseUrl}/masters/options/autocomplete`,
    fetcher,
  );

  const list = data?.find(
    (master) => master.slug === MasterOptionConfig.estudios,
  );

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
      getOptionLabel={(option) => `${option.name}` || ""}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={list ? list.masterOption : []}
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
      onChange={(_, newValue) => onAutocompleteChange(newValue?.id)}
    />
  );
};

export default FilterStudioAutocomplete;
