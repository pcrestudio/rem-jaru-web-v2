import React, { FC } from "react";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetSectionAttributesBySlugDto } from "@/app/dto/attribute-values/get-section-attributes-by-slug.dto";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  DataType,
  RowLayout,
} from "@/app/dto/attribute-values/get-section-attributes.dto";
import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { useReactiveForm } from "@/components/states/useReactiveForm";
import { Input } from "@nextui-org/input";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { autocompleteStyle } from "@/theme/autocompleteStyle";

export interface SectionAttributeFieldsProps extends ReactiveFieldProps {
  pathname: string;
  touchedFields?: ReturnType<typeof useReactiveForm>["touchedFields"];
}

const mappingRowLayout: Record<RowLayout, string> = {
  single: "col-span-12",
  twoColumns: "col-span-6",
  threeColumns: "col-span-4",
};

const SectionAttributeFields: FC<SectionAttributeFieldsProps> = ({
  pathname,
  control,
}) => {
  const { data } = useSWR<GetSectionAttributesBySlugDto[]>(
    `${environment.baseUrl}/attribute-values/section/attributes?slug=${pathname}`,
    fetcher,
  );

  return (
    <div className="col-span-12">
      {data &&
        data.map(
          (section) =>
            section.collapsable && (
              <Accordion
                selectionMode="multiple"
                variant="splitted"
                key={`${section.label}`}
                itemClasses={{
                  title: "text-cerulean-950 font-bold text-lg",
                  trigger: "border-b-red-500",
                }}
              >
                <AccordionItem title={section.label}>
                  <div className="grid grid-cols-12 gap-4">
                    {section.attributes.map((attribute) => (
                      <div
                        className={mappingRowLayout[attribute.rowLayout]}
                        key={attribute.slug}
                      >
                        {attribute.dataType === DataType.TEXT && (
                          <Controller
                            name={attribute.slug}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Input
                                isRequired={true}
                                label={attribute.label}
                                {...field}
                              />
                            )}
                          />
                        )}

                        {attribute.dataType === DataType.LIST && (
                          <Controller
                            name={attribute.slug}
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
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
                                  onChange(newValue ? newValue.optionValue : "")
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
