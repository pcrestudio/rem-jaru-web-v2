import React, { FC, useEffect } from "react";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { DatePicker } from "@nextui-org/react";
import {
  DataType,
  GetSectionAttributesDto,
  RowLayout,
} from "@/app/dto/attribute-values/get-section-attributes.dto";
import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { useReactiveForm } from "@/components/states/useReactiveForm";
import { Input, Textarea } from "@nextui-org/input";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
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
    <div className="grid grid-cols-12 gap-2 col-span-12">
      {data &&
        data.map((global, index) => (
          <div
            className={`${
              mappingRowLayout[global.rowLayout]
            } -order-${global.order}`}
            key={global.slug}
          >
            {global.dataType === DataType.TEXT && (
              <Controller
                name={customFieldIndicator(global.slug, global.dataType)}
                defaultValue={global.values[0]?.value ?? ""}
                control={control}
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
                name={customFieldIndicator(global.slug, global.dataType)}
                defaultValue={global.values[0]?.value ?? ""}
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired={true}
                    label={global.label}
                    type="number"
                    placeholder="0.0"
                    className="nextui-input-nomodal"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    {...field}
                  />
                )}
              />
            )}

            {global.dataType === DataType.FILE && (
              <ReactiveFieldFile
                name={customFieldIndicator(global.slug, global.dataType)}
                defaultValue={global.values[0]?.value ?? ""}
                control={control}
              />
            )}

            {global.dataType === DataType.INTEGER && (
              <Controller
                name={customFieldIndicator(global.slug, global.dataType)}
                defaultValue={global.values[0]?.value ?? ""}
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired={true}
                    label={global.label}
                    type="number"
                    placeholder="0.0"
                    min={0}
                    className="nextui-input-nomodal"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">%</span>
                      </div>
                    }
                    {...field}
                  />
                )}
              />
            )}

            {global.dataType === DataType.TEXTAREA && (
              <Controller
                name={customFieldIndicator(global.slug, global.dataType)}
                control={control}
                defaultValue={global.values[0]?.value ?? ""}
                render={({ field }) => (
                  <Textarea
                    isRequired={true}
                    className="nextui-textarea-nomodal"
                    label={global.label}
                    {...field}
                  />
                )}
              />
            )}

            {global.dataType === DataType.DATE && (
              <Controller
                name={customFieldIndicator(global.slug, global.dataType)}
                defaultValue={
                  global.values[0]?.value
                    ? convertToZonedDateTime(global.values[0]?.value)
                    : null
                }
                control={control}
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
                name={customFieldIndicator(global.slug, global.dataType)}
                control={control}
                defaultValue={global.values[0]?.value || ""}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    fullWidth
                    options={global.options}
                    getOptionLabel={(option) => option.optionLabel || ""}
                    value={
                      value && global.options
                        ? global.options.find(
                            (option) => option.optionValue === value,
                          )
                        : null
                    }
                    sx={autocompleteStyle}
                    onChange={(_, newValue) =>
                      onChange(newValue ? newValue.optionValue : "")
                    }
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        size="medium"
                        className="nextui-input"
                        label={global.label}
                      />
                    )}
                  ></Autocomplete>
                )}
              ></Controller>
            )}
          </div>
        ))}
    </div>
  );
};

export default GlobalAttributeFields;
