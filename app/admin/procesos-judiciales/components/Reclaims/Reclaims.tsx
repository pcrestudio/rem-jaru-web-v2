import React, { FC, Fragment, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@heroui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Accordion, AccordionItem, Divider } from "@heroui/react";

import { ModularProps } from "@/app/admin/procesos-judiciales/types/ModularProps";
import ReactiveNumericField from "@/components/form/ReactiveNumericField";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";
import mockReclaims from "@/app/admin/procesos-judiciales/constants/reclaims.constant";
import { ExtendedAttributeConfig } from "@/config/extended-attribute.config";
import debounce from "@/utils/custom_debounce";
import { ContingencyLevelConfig } from "@/config/contingency-level.config";

const Reclaims: FC<ModularProps> = ({
  control,
  errors,
  register,
  setValue,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "reclaims",
  });

  const values = watch("reclaims");

  const calculateTotalAmount = () => {
    const amount = values?.reduce((sum, item) => Number(item.amount) + sum, 0);

    setValue(`${ExtendedAttributeConfig.amount}`, Number(amount).toFixed(2));

    return Number(amount).toFixed(2);
  };

  const calculateTotalProvisionAmount = () => {
    const provisionAmount = values?.reduce(
      (sum, item) => Number(item.provisionAmount) + sum,
      0,
    );

    return Number(provisionAmount).toFixed(2);
  };

  const calculateContingencyLevel = (percentage: number, index: number) => {
    if (percentage > 0 && percentage < 10) {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.contingencyLevel}`,
        ContingencyLevelConfig.remoto,
      );
    } else if (percentage >= 10 && percentage < 50) {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.contingencyLevel}`,
        ContingencyLevelConfig.posible,
      );
    } else if (percentage >= 50 && percentage < 90) {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.contingencyLevel}`,
        ContingencyLevelConfig.probable,
      );
    } else if (percentage >= 90) {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.contingencyLevel}`,
        ContingencyLevelConfig.virtualmente,
      );
    } else {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.contingencyLevel}`,
        null,
      );
    }
  };

  const calculateProvisionAmount = (index: number) => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        const reclaim = values[index];

        const provisionAmount: number =
          (Number(reclaim["amount"]) *
            Number(reclaim["provisionContingency"])) /
          100;

        if (!isNaN(provisionAmount)) {
          setValue(
            `reclaims.${index}.${ExtendedAttributeConfig.provisionAmount}`,
            provisionAmount.toFixed(2),
          );
        }
      });
    }, 0);
  };

  const handleChange = (value: any, index: number, key: string) => {
    let filterValue: string | number = "";

    if (key === ExtendedAttributeConfig.provisionContingency) {
      calculateProvisionAmount(index);
    }

    if (key === ExtendedAttributeConfig.contingencyPercentage) {
      filterValue = Number(value);
      calculateContingencyLevel(filterValue, index);
    } else {
      filterValue = value;
    }

    if (filterValue) {
      setValue(`reclaims.${index}.${key}`, filterValue);
    }
  };

  const debounceChange = debounce(handleChange, 100);

  return (
    <Accordion
      key="Petitorios"
      className="col-span-12"
      itemClasses={{
        title: "text-cerulean-950 font-bold text-lg",
        base: "pb-4 shadow-none border border-slate-200",
        trigger: "border-b-red-500 pt-4 pb-1",
      }}
      selectionMode="single"
      variant="splitted"
    >
      <AccordionItem title="Petitorios">
        <div className="col-span-12 flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <p />
            <Button
              className="standard-btn w-auto text-white"
              startContent={<AiOutlinePlus />}
              onPress={() => append(mockReclaims)}
            >
              Nuevo petitorio
            </Button>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                {index > 0 ? (
                  <Button
                    className="bg-transparent col-span-2 flex items-center justify-center"
                    endContent={<AiOutlineClose />}
                    onPress={() => remove(index)}
                  />
                ) : (
                  <div className="col-span-2" />
                )}

                <ReactiveNumericField
                  className="col-span-2"
                  control={control}
                  errors={errors}
                  label="Monto"
                  labelClassName="text-xs"
                  min={0}
                  name={`reclaims.${index}.amount`}
                  onChange={(value) =>
                    debounceChange(value, index, ExtendedAttributeConfig.amount)
                  }
                />

                <ReactiveNumericField
                  className="col-span-2 placeholder:text-xs text-xs"
                  control={control}
                  errors={errors}
                  label="% de contingencia"
                  labelClassName="text-xs"
                  min={0}
                  name={`reclaims.${index}.contingencyPercentage`}
                  onChange={(value) =>
                    debounceChange(
                      value,
                      index,
                      ExtendedAttributeConfig.contingencyPercentage,
                    )
                  }
                />

                <DynamicAutocomplete
                  disabled
                  className="col-span-2 nextui-input-nomodal"
                  control={control}
                  errors={errors}
                  label="Nv. de contigencia"
                  name={`reclaims.${index}.contingencyLevel`}
                  optionValue="slug"
                  register={register}
                  slug={MasterOptionConfig["nivel-contingencia"]}
                />

                <ReactiveNumericField
                  className="col-span-2 placeholder:text-xs text-xs"
                  control={control}
                  errors={errors}
                  label="% de provisión"
                  labelClassName="text-xs"
                  min={0}
                  name={`reclaims.${index}.provisionContingency`}
                  onChange={(value) =>
                    debounceChange(
                      value,
                      index,
                      ExtendedAttributeConfig.provisionContingency,
                    )
                  }
                />

                <ReactiveNumericField
                  className="col-span-2 placeholder:text-xs text-xs"
                  control={control}
                  errors={errors}
                  label="Monto provisión"
                  labelClassName="text-xs"
                  min={0}
                  name={`reclaims.${index}.provisionAmount`}
                />
              </Fragment>
            ))}

            <p className="col-span-2" />

            <Divider className="col-span-10" />

            <p className="col-span-2" />

            <p className="col-span-4 border border-slate-200 p-4 rounded-xl text-xs flex items-center">
              <span className="font-bold">
                Cuantía total: {calculateTotalAmount()}
              </span>
            </p>

            <p className="col-span-2 border border-slate-200 p-4 rounded-xl text-xs flex items-center justify-center">
              /
            </p>

            <p className="col-span-4 border border-slate-200 p-4 rounded-xl text-xs flex items-center">
              <span className="font-bold">
                Cuantía total a provisionar: {calculateTotalProvisionAmount()}
              </span>
            </p>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Reclaims;
