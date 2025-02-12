"use client";

import React, { FC, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import useSWR from "swr";

import { autocompleteStyle } from "@/theme/autocompleteStyle";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import { ReactiveFieldProps } from "@/components/form/ReactiveTextArea";

export interface FilterModuleAutocompleteProps extends ReactiveFieldProps {
  onChange: (event: any, value: string | number | object) => void;
}

const FilterModuleAutocomplete: FC<FilterModuleAutocompleteProps> = ({
  name,
  label,
  className,
  isRequired,
  disabled,
  noModal,
  onChange,
}) => {
  const { data } = useSWR<GetModuleDto[]>(
    `${environment.baseUrl}/modules`,
    fetcher,
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
      options={data ? data : []}
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

export default FilterModuleAutocomplete;
