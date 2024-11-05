"use client";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import React, { FC } from "react";
import useSWR from "swr";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { Autocomplete, TextField } from "@mui/material";
import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";
import { Controller } from "react-hook-form";

const CargoStudioAutocomplete: FC<ReactiveFieldProps> = ({
  name,
  label,
  className,
  control,
}) => {
  const { data } = useSWR<GetMastersDto[]>(
    `${environment.baseUrl}/masters/options`,
    fetcher,
  );
  const listCargoStudio = data?.find(
    (master) => master.slug === "estudios-a-cargo",
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          disableClearable
          options={listCargoStudio ? listCargoStudio.MasterOption : []}
          getOptionLabel={(option: GetMasterOptionsDto) => option.name || ""}
          value={
            value && listCargoStudio
              ? listCargoStudio.MasterOption.find(
                  (option) => option.id === value,
                )
              : null
          }
          sx={{
            ".MuiInputBase-root": {
              background: "transparent",
              fontSize: "13px",
              paddingTop: "12px !important",
            },
          }}
          onChange={(_, newValue) => onChange(newValue ? newValue.id : "")}
          className={className}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
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

export default CargoStudioAutocomplete;
