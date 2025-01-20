import React, { FC, useEffect } from "react";
import useSWR from "swr";
import { Accordion, AccordionItem, DatePicker } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/input";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetSectionAttributesBySlugDto } from "@/app/dto/attribute-values/get-section-attributes-by-slug.dto";
import {
  DataType,
  RowLayout,
} from "@/app/dto/attribute-values/get-section-attributes.dto";
import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { useReactiveForm } from "@/components/states/useReactiveForm";
import { autocompleteStyle } from "@/theme/autocompleteStyle";
import { convertToZonedDateTime } from "@/utils/format_date";
import ReactiveFieldFile from "@/components/form/ReactiveFieldFile";
import { ModelType } from "@/config/model-type.config";

export interface SectionAttributeFieldsProps extends ReactiveFieldProps {
  pathname: string;
  entityReference?: string;
  modelType?: string;
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
  `${slug}-custom-${type}`;

const SectionAttributeFields: FC<SectionAttributeFieldsProps> = ({
  pathname,
  entityReference,
  modelType = ModelType.JudicialProcess,
  control,
  reset,
  getValues,
}) => {
  const { data } = useSWR<GetSectionAttributesBySlugDto[]>(
    `${environment.baseUrl}/extended/section/attributes?slug=${pathname}&entityReference=${entityReference}&modelType=${modelType}`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      const formValues = {};
      const currentValues = getValues();

      data.forEach((section) => {
        section.attributes.forEach((attribute) => {
          const fieldName = `${attribute.slug}-custom-${attribute.dataType}`;

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
      });

      const combinedValues = { ...currentValues, ...formValues };

      reset(combinedValues);
    }
  }, [data]);

  return (
    <div className="col-span-12">
      {data &&
        data.map(
          (section) =>
            section.collapsable && (
              <Accordion
                key={`${section.label}`}
                className="mb-4"
                itemClasses={{
                  title: "text-cerulean-950 font-bold text-lg",
                  base: "pb-4 shadow-none border border-slate-200",
                  trigger: "border-b-red-500 pt-4 pb-1",
                }}
                selectionMode="multiple"
                variant="splitted"
              >
                <AccordionItem title={section.label}>
                  <div className="grid grid-cols-12 gap-4">
                    {section.attributes
                      .sort((a, b) => a.order - b.order)
                      .map((attribute) => (
                        <div
                          key={attribute.slug}
                          className={`${
                            mappingRowLayout[attribute.rowLayout]
                          } -order-${attribute.order}`}
                        >
                          {attribute.dataType === DataType.TEXT && (
                            <Controller
                              control={control}
                              defaultValue={attribute.values[0]?.value ?? ""}
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              render={({ field }) => (
                                <Input
                                  isRequired={true}
                                  label={attribute.label}
                                  {...field}
                                />
                              )}
                            />
                          )}

                          {attribute.dataType === DataType.FLOAT && (
                            <Controller
                              control={control}
                              defaultValue={attribute.values[0]?.value ?? ""}
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              render={({ field }) => (
                                <Input
                                  endContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">
                                        $
                                      </span>
                                    </div>
                                  }
                                  isRequired={true}
                                  label={attribute.label}
                                  placeholder="0.0"
                                  type="number"
                                  {...field}
                                />
                              )}
                            />
                          )}

                          {attribute.dataType === DataType.FILE && (
                            <ReactiveFieldFile
                              control={control}
                              defaultValue={attribute.values[0]?.value ?? ""}
                              label={attribute.label}
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                            />
                          )}

                          {attribute.dataType === DataType.INTEGER && (
                            <Controller
                              control={control}
                              defaultValue={attribute.values[0]?.value ?? ""}
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              render={({ field }) => (
                                <Input
                                  endContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">
                                        %
                                      </span>
                                    </div>
                                  }
                                  isRequired={true}
                                  label={attribute.label}
                                  min={0}
                                  placeholder="0.0"
                                  type="number"
                                  {...field}
                                />
                              )}
                            />
                          )}

                          {attribute.dataType === DataType.TEXTAREA && (
                            <Controller
                              control={control}
                              defaultValue={attribute.values[0]?.value ?? ""}
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              render={({ field }) => (
                                <Textarea
                                  isRequired={true}
                                  label={attribute.label}
                                  {...field}
                                />
                              )}
                            />
                          )}

                          {attribute.dataType === DataType.DATE && (
                            <Controller
                              control={control}
                              defaultValue={
                                attribute.values[0]?.value
                                  ? convertToZonedDateTime(
                                      attribute.values[0]?.value,
                                    )
                                  : null
                              }
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              render={({ field }) => (
                                <DatePicker
                                  label={attribute.label}
                                  {...field}
                                  value={field.value}
                                  onChange={(newValue) => {
                                    field.onChange(newValue);
                                  }}
                                />
                              )}
                            />
                          )}

                          {attribute.dataType === DataType.LIST && (
                            <Controller
                              control={control}
                              defaultValue={attribute.values[0]?.value || ""}
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                  fullWidth
                                  getOptionLabel={(option) =>
                                    option.optionLabel || ""
                                  }
                                  isOptionEqualToValue={(option, value) =>
                                    option === value
                                  }
                                  options={attribute.options}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className="nextui-input"
                                      label={attribute.label}
                                      size="medium"
                                      variant="filled"
                                    />
                                  )}
                                  sx={autocompleteStyle}
                                  value={
                                    value && attribute.options
                                      ? attribute.options.find(
                                          (option) =>
                                            option.optionValue === value,
                                        )
                                      : null
                                  }
                                  onChange={(_, newValue) =>
                                    onChange(
                                      newValue ? newValue.optionValue : "",
                                    )
                                  }
                                />
                              )}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </AccordionItem>
              </Accordion>
            ),
        )}
    </div>
  );
};

export default SectionAttributeFields;
