"use client";

import React, { FC, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import useSWR from "swr";

import { autocompleteStyle } from "@/theme/autocompleteStyle";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { CustomDataGridPagination } from "@/app/admin/types/CustomDataGridPagination";
import { ReactiveFieldProps } from "@/components/form/ReactiveTextArea";

export interface FilterResponsibleAutocompleteProps extends ReactiveFieldProps {
  onChange: (event: any, value: string | number | object) => void;
  filter?: string;
}

const FilterResponsibleAutocomplete: FC<FilterResponsibleAutocompleteProps> = ({
  name,
  label,
  className,
  isRequired,
  disabled,
  noModal,
  onChange,
  filter,
}) => {
  const { data } = useSWR<CustomDataGridPagination<GetUserDto>>(
    `${environment.baseUrl}/users?pageSize=200${filter ?? ""}`,
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

export default FilterResponsibleAutocomplete;
