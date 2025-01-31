import React, { FC, Fragment, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@heroui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

import { ModularProps } from "@/app/admin/procesos-judiciales/types/ModularProps";
import ReactiveNumericField from "@/components/form/ReactiveNumericField";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";
import mockReclaims from "@/app/admin/procesos-judiciales/constants/reclaims.constant";
import { ExtendedAttributeConfig } from "@/config/extended-attribute.config";
import debounce from "@/utils/custom_debounce";

const Reclaims: FC<ModularProps> = ({
  control,
  errors,
  register,
  provision,
  getValues,
  setValue,
  watch,
}) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "reclaims",
  });

  const values = getValues();

  const calculateContingencyLevel = (percentage: number, index: number) => {
    if (percentage > 0 && percentage < 50) {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.contingencyLevel}`,
        "remoto",
      );
    } else if (percentage >= 50 && percentage < 80) {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.contingencyLevel}`,
        "posible",
      );
    } else if (percentage >= 80) {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.contingencyLevel}`,
        "probable",
      );
    } else {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.contingencyLevel}`,
        null,
      );
    }
  };

  const calculateProvisionAmount = (index: number) => {
    const reclaim = values?.reclaims[index];

    const provisionAmount: number =
      (reclaim["amount"] * reclaim["provisionContingency"]) / 100;

    if (provisionAmount || !isNaN(provisionAmount)) {
      setValue(
        `reclaims.${index}.${ExtendedAttributeConfig.provisionAmount}`,
        provisionAmount.toFixed(2),
      );
    }
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

  const debounceChange = debounce(handleChange, 700);

  return (
    <div className="col-span-12 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h1>Petitorio</h1>

        <Button
          className="bg-transparent"
          endContent={<AiOutlinePlus />}
          onPress={() => append(mockReclaims)}
        />
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
              labelClassName="text-xs"
              control={control}
              errors={errors}
              label="Monto"
              min={0}
              name={`reclaims.${index}.amount`}
              onChange={(value) =>
                debounceChange(value, index, ExtendedAttributeConfig.amount)
              }
            />

            <ReactiveNumericField
              className="col-span-2 placeholder:text-xs text-xs"
              labelClassName="text-xs"
              control={control}
              errors={errors}
              label="% de contingencia"
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
              labelClassName="text-xs"
              control={control}
              errors={errors}
              label="% de provisión"
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
              labelClassName="text-xs"
              control={control}
              errors={errors}
              label="Monto provisión"
              min={0}
              name={`reclaims.${index}.provisionAmount`}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Reclaims;
