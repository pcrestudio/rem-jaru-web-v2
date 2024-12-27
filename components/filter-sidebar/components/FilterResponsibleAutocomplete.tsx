"use client";

import React, { FC, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { autocompleteStyle } from "@/theme/autocompleteStyle";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { CustomDataGridPagination } from "@/app/admin/types/CustomDataGridPagination";

export interface FilterResponsibleAutocompleteProps extends ReactiveFieldProps {
  onChange: (event: any, value: string | number | object) => void;
}

const FilterResponsibleAutocomplete: FC<FilterResponsibleAutocompleteProps> = ({
  name,
  label,
  className,
  isRequired,
  disabled,
  noModal,
  onChange,
}) => {
  const { data } = useSWR<CustomDataGridPagination<GetUserDto>>(
    `${environment.baseUrl}/auth/users`,
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
          inputRef={textFieldRef}
          name={name}
          className={noModal ? "nextui-input" : ""}
          disabled={disabled}
          label={label}
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
