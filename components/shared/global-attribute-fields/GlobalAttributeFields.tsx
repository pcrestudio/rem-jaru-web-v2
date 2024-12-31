import React, { FC, useEffect } from "react";
import useSWR from "swr";
import { DatePicker } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/input";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import {
  DataType,
  GetSectionAttributesDto,
  RowLayout,
} from "@/app/dto/attribute-values/get-section-attributes.dto";
import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { useReactiveForm } from "@/components/states/useReactiveForm";
import { autocompleteStyle } from "@/theme/autocompleteStyle";
import { convertToZonedDateTime } from "@/utils/format_date";
import ReactiveFieldFile from "@/components/form/ReactiveFieldFile";

export interface GlobalAttributeFieldsProps extends ReactiveFieldProps {
  pathname: string;
  entityReference?: string;
  touchedFields?: ReturnType<typeof useReactiveForm>["touchedFields"];
  reset?: any;
  getValues?: any;
}

const mappingRowLayout: Record<RowLayout, string> = {
  single: "col-span-12",
  twoColumns: "col-span-6",
  threeColumns: "col-span-4",
};

const customFieldIndicator = (slug: string, type: string) =>
  `${slug}-global-${type}`;

const GlobalAttributeFields: FC<GlobalAttributeFieldsProps> = ({
  pathname,
  entityReference,
  control,
  reset,
  getValues,
}) => {
  const { data } = useSWR<GetSectionAttributesDto[]>(
    `${environment.baseUrl}/extended/section/attributes?slug=${pathname}&entityReference=${entityReference}&isGlobal=true`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      const formValues = {};
      const currentValues = getValues();

      data.forEach((attribute) => {
        const fieldName = `${attribute.slug}-global-${attribute.dataType}`;

        if (attribute.dataType === "DATE" && attribute.values[0]?.value) {
          formValues[fieldName] = convertToZonedDateTime(
            attribute.values[0]?.value,
          );
        } else if (
          attribute.dataType === "DATE" &&
          !attribute.values[0]?.value
        ) {
          formValues[fieldName] = attribute.values[0]?.value || null;
        } else {
          formValues[fieldName] = attribute.values[0]?.value || "";
        }
      });

      const combinedValues = { ...currentValues, ...formValues };

      reset(combinedValues);
    }
  }, [data]);

  return (
    <>
      {data &&
        data.map((global) => (
          <div
            key={global.slug}
            className={`${
              mappingRowLayout[global.rowLayout]
            } -order-${global.order}`}
          >
            {global.dataType === DataType.TEXT && (
              <Controller
                control={control}
                defaultValue={global.values[0]?.value ?? ""}
                name={customFieldIndicator(global.slug, global.dataType)}
                render={({ field }) => (
                  <Input
                    isRequired={true}
                    label={global.label}
                    {...field}
                    className="nextui-input-nomodal"
                  />
                )}
              />
            )}

            {global.dataType === DataType.FLOAT && (
              <Controller
                control={control}
                defaultValue={global.values[0]?.value ?? ""}
                name={customFieldIndicator(global.slug, global.dataType)}
                render={({ field }) => (
                  <Input
                    className="nextui-input-nomodal"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    isRequired={true}
                    label={global.label}
                    placeholder="0.0"
                    type="number"
                    {...field}
                  />
                )}
              />
            )}

            {global.dataType === DataType.FILE && (
              <ReactiveFieldFile
                control={control}
                defaultValue={global.values[0]?.value ?? ""}
                name={customFieldIndicator(global.slug, global.dataType)}
              />
            )}

            {global.dataType === DataType.INTEGER && (
              <Controller
                control={control}
                defaultValue={global.values[0]?.value ?? ""}
                name={customFieldIndicator(global.slug, global.dataType)}
                render={({ field }) => (
                  <Input
                    className="nextui-input-nomodal"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">%</span>
                      </div>
                    }
                    isRequired={true}
                    label={global.label}
                    min={0}
                    placeholder="0.0"
                    type="number"
                    {...field}
                  />
                )}
              />
            )}

            {global.dataType === DataType.TEXTAREA && (
              <Controller
                control={control}
                defaultValue={global.values[0]?.value ?? ""}
                name={customFieldIndicator(global.slug, global.dataType)}
                render={({ field }) => (
                  <Textarea
                    className="nextui-textarea-nomodal"
                    isRequired={true}
                    label={global.label}
                    {...field}
                  />
                )}
              />
            )}

            {global.dataType === DataType.DATE && (
              <Controller
                control={control}
                defaultValue={
                  global.values[0]?.value
                    ? convertToZonedDateTime(global.values[0]?.value)
                    : null
                }
                name={customFieldIndicator(global.slug, global.dataType)}
                render={({ field }) => (
                  <DatePicker
                    isRequired={true}
                    label={global.label}
                    {...field}
                    className="nextui-input-nomodal"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
            )}

            {global.dataType === DataType.LIST && (
              <Controller
                control={control}
                defaultValue={global.values[0]?.value || ""}
                name={customFieldIndicator(global.slug, global.dataType)}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    fullWidth
                    getOptionLabel={(option) => option.optionLabel || ""}
                    isOptionEqualToValue={(option, value) => option === value}
                    options={global.options}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="nextui-input-nomodal"
                        label={global.label}
                        size="medium"
                        variant="filled"
                      />
                    )}
                    sx={autocompleteStyle}
                    value={
                      value && global.options
                        ? global.options.find(
                            (option) => option.optionValue === value,
                          )
                        : null
                    }
                    onChange={(_, newValue) =>
                      onChange(newValue ? newValue.optionValue : "")
                    }
                  />
                )}
              />
            )}
          </div>
        ))}
    </>
  );
};

export default GlobalAttributeFields;
