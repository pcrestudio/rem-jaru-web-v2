import React, { FC, useEffect } from "react";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetSectionAttributesBySlugDto } from "@/app/dto/attribute-values/get-section-attributes-by-slug.dto";
import { Accordion, AccordionItem, DatePicker } from "@nextui-org/react";
import {
  DataType,
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

export interface SectionAttributeFieldsProps extends ReactiveFieldProps {
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
  `${slug}-custom-${type}`;

const SectionAttributeFields: FC<SectionAttributeFieldsProps> = ({
  pathname,
  entityReference,
  control,
  reset,
  getValues,
}) => {
  const { data } = useSWR<GetSectionAttributesBySlugDto[]>(
    `${environment.baseUrl}/extended/section/attributes?slug=${pathname}&entityReference=${entityReference}`,
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
          (section, index) =>
            section.collapsable && (
              <Accordion
                selectionMode="multiple"
                variant="splitted"
                key={`${section.label}`}
                className="mb-4"
                itemClasses={{
                  title: "text-cerulean-950 font-bold text-lg",
                  base: "pb-4 shadow-none border border-slate-200",
                  trigger: "border-b-red-500 pt-4 pb-1",
                }}
              >
                <AccordionItem title={section.label}>
                  <div className="grid grid-cols-12 gap-4">
                    {section.attributes
                      .sort((a, b) => a.order - b.order)
                      .map((attribute) => (
                        <div
                          className={`${
                            mappingRowLayout[attribute.rowLayout]
                          } -order-${attribute.order}`}
                          key={attribute.slug}
                        >
                          {attribute.dataType === DataType.TEXT && (
                            <Controller
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              defaultValue={attribute.values[0]?.value ?? ""}
                              control={control}
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
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              defaultValue={attribute.values[0]?.value ?? ""}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  isRequired={true}
                                  label={attribute.label}
                                  type="number"
                                  placeholder="0.0"
                                  endContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">
                                        $
                                      </span>
                                    </div>
                                  }
                                  {...field}
                                />
                              )}
                            />
                          )}

                          {attribute.dataType === DataType.FILE && (
                            <ReactiveFieldFile
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              defaultValue={attribute.values[0]?.value ?? ""}
                              control={control}
                            />
                          )}

                          {attribute.dataType === DataType.INTEGER && (
                            <Controller
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              defaultValue={attribute.values[0]?.value ?? ""}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  isRequired={true}
                                  label={attribute.label}
                                  type="number"
                                  placeholder="0.0"
                                  min={0}
                                  endContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">
                                        %
                                      </span>
                                    </div>
                                  }
                                  {...field}
                                />
                              )}
                            />
                          )}

                          {attribute.dataType === DataType.TEXTAREA && (
                            <Controller
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              control={control}
                              defaultValue={attribute.values[0]?.value ?? ""}
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
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              defaultValue={
                                attribute.values[0]?.value
                                  ? convertToZonedDateTime(
                                      attribute.values[0]?.value,
                                    )
                                  : null
                              }
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  isRequired={true}
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
                              name={customFieldIndicator(
                                attribute.slug,
                                attribute.dataType,
                              )}
                              control={control}
                              defaultValue={attribute.values[0]?.value || ""}
                              render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                  fullWidth
                                  options={attribute.options}
                                  getOptionLabel={(option) =>
                                    option.optionLabel || ""
                                  }
                                  value={
                                    value && attribute.options
                                      ? attribute.options.find(
                                          (option) =>
                                            option.optionValue === value,
                                        )
                                      : null
                                  }
                                  sx={autocompleteStyle}
                                  onChange={(_, newValue) =>
                                    onChange(
                                      newValue ? newValue.optionValue : "",
                                    )
                                  }
                                  isOptionEqualToValue={(option, value) =>
                                    option === value
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="filled"
                                      size="medium"
                                      className="nextui-input"
                                      label={attribute.label}
                                    />
                                  )}
                                ></Autocomplete>
                              )}
                            ></Controller>
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
