import React, { FC, useEffect } from "react";
import useSWR from "swr";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { Accordion, AccordionItem, DatePicker } from "@heroui/react";
import { Input, Textarea } from "@heroui/input";
import { format } from "date-fns";

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
import { GetSectionAttributeOptionDto } from "@/app/dto/attribute-values/get-section-attribute-option.dto";
import { ExtendedAttributeConfig } from "@/config/extended-attribute.config";
import { GetJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/get-judicial-process.dto";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";

export interface SectionAttributeFieldsProps extends ReactiveFieldProps {
  pathname: string;
  entityReference?: string;
  modelType?: string;
  touchedFields?: ReturnType<typeof useReactiveForm>["touchedFields"];
  provision?: GetJudicialProcessDto | GetSupervisionDto;
  reset?: any;
  getValues?: any;
  errors?: any;
  register?: any;
  setValue?: any;
  watch?: any;
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

  const acceptUpdateLabel: string[] = [
    ExtendedAttributeConfig.lastSituation,
    ExtendedAttributeConfig.nextSituation,
  ];

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
    <div className="col-span-12 grid grid-cols-12 gap-4">
      {data &&
        data.map(
          (section) =>
            section.collapsable && (
              <Accordion
                key={`${section.label}`}
                className={`col-span-12 order-${section.order}`}
                itemClasses={{
                  title: "text-cerulean-950 font-bold text-lg",
                  base: "pb-4 shadow-none border border-slate-200",
                  trigger: "border-b-red-500 pt-4 pb-1",
                }}
                selectionMode="single"
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
                                  isRequired={attribute.isRequired}
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
                                  isRequired={attribute.isRequired}
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
                                  isRequired={attribute.isRequired}
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
                                  {...field}
                                  description={
                                    <>
                                      {String(
                                        acceptUpdateLabel
                                          .includes(attribute.slug)
                                          .valueOf(),
                                      ) === "true" &&
                                        attribute.values[0]?.modifiedAt && (
                                          <span className="text-xs text-slate-500 font-semibold">
                                            Actualizado el:{" "}
                                            {format(
                                              new Date(
                                                attribute.values[0]?.modifiedAt,
                                              ),
                                              "dd/MM/yyyy",
                                            )}
                                          </span>
                                        )}
                                    </>
                                  }
                                  isRequired={attribute.isRequired}
                                  label={`${attribute.label}`}
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
                                  getOptionLabel={(
                                    option: GetSectionAttributeOptionDto,
                                  ) => option.optionLabel || ""}
                                  isOptionEqualToValue={(option, value) => {
                                    if (attribute.isMultiple) {
                                      return (
                                        (option as GetSectionAttributeOptionDto)
                                          .optionValue ===
                                        (value as GetSectionAttributeOptionDto)
                                          .optionValue
                                      );
                                    } else {
                                      return (
                                        (option as GetSectionAttributeOptionDto)
                                          .optionValue ===
                                        (value as GetSectionAttributeOptionDto)
                                          .optionValue
                                      );
                                    }
                                  }}
                                  multiple={attribute.isMultiple}
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
                                    value && data
                                      ? attribute.isMultiple
                                        ? attribute.options.filter((option) =>
                                            value.includes(option.optionValue),
                                          )
                                        : attribute.options.find(
                                            (option) =>
                                              option.optionValue === value,
                                          )
                                      : attribute.isMultiple
                                        ? []
                                        : null
                                  }
                                  onChange={(
                                    _,
                                    newValue:
                                      | GetSectionAttributeOptionDto
                                      | GetSectionAttributeOptionDto[],
                                  ) => {
                                    if (attribute.isMultiple) {
                                      onChange(
                                        Array.isArray(newValue)
                                          ? newValue.map((v) => v.optionValue)
                                          : [],
                                      );
                                    } else {
                                      onChange(
                                        newValue
                                          ? (
                                              newValue as GetSectionAttributeOptionDto
                                            ).optionValue
                                          : "",
                                      );
                                    }
                                  }}
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
