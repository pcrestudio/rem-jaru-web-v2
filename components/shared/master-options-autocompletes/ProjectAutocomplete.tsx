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

const ProjectAutocomplete: FC<ReactiveFieldProps> = ({
  name,
  label,
  className,
  control,
  isRequired,
}) => {
  const { data } = useSWR<GetMasterOptionAutoComplete[]>(
    `${environment.baseUrl}/masters/options/autocomplete`,
    fetcher,
  );

  const listProjects = data?.find((master) => master.slug === "proyectos");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          options={listProjects ? listProjects.masterOption : []}
          getOptionLabel={(option: GetMasterOptionsDto) => option.name || ""}
          value={
            value && listProjects
              ? listProjects.masterOption.find((option) => option.id === value)
              : null
          }
          sx={autocompleteStyle}
          onChange={(_, newValue) => onChange(newValue ? newValue.id : "")}
          className={className}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              required={isRequired}
              variant="filled"
              size="medium"
              className="nextui-input"
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

export default ProjectAutocomplete;
