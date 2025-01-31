import React, { FC, useEffect, useState } from "react";
import { errors } from "openid-client";

import ReactiveSwitch from "@/components/form/ReactiveSwitch";
import ReactiveFieldFile from "@/components/form/ReactiveFieldFile";
import ReactiveTextArea from "@/components/form/ReactiveTextArea";
import ReactiveNumericField from "@/components/form/ReactiveNumericField";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";
import { ExtendedAttributeConfig } from "@/config/extended-attribute.config";
import { ModularProps } from "@/app/admin/procesos-judiciales/types/ModularProps";
import { ContingencyLevelConfig } from "@/config/contingency-level.config";

const ProvisionCheck: FC<ModularProps> = ({
  control,
  register,
  provision,
  getValues,
  setValue,
  watch,
}) => {
  const [isProvisional, setIsProvisional] = useState<boolean>(
    provision?.isProvisional ?? false,
  );

  const values = getValues();

  const reclaims = watch("reclaims");

  const calculateProvisionPercentage = () => {
    const provisionAmount = reclaims?.reduce(
      (sum, item) => Number(item.provisionAmount) + sum,
      0,
    );

    const amount = reclaims?.reduce(
      (sum, item) => Number(item.amount) + sum,
      0,
    );

    const percentage = (provisionAmount / amount) * 100;

    setValue(
      ExtendedAttributeConfig.provisionContingency,
      Math.round(percentage),
    );
  };

  const calculateContingencyLevel = () => {
    const contingencyPercentage = Number(values?.contingencyPercentage) ?? 0;

    if (contingencyPercentage > 0 && contingencyPercentage < 10) {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.remoto,
      );
    } else if (contingencyPercentage >= 10 && contingencyPercentage < 50) {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.posible,
      );
    } else if (contingencyPercentage >= 50 && contingencyPercentage < 90) {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.probable,
      );
      setValue(ExtendedAttributeConfig.isProvisional, true);
      setIsProvisional(true);
    } else if (contingencyPercentage >= 90) {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.virtualmente,
      );
      setValue(ExtendedAttributeConfig.isProvisional, true);
      setIsProvisional(true);
    } else {
      setValue(ExtendedAttributeConfig.contingencyLevel, null);
      setValue(ExtendedAttributeConfig.isProvisional, false);
      setIsProvisional(false);
    }
  };

  const calculateProvision = () => {
    const amount = parseFloat(values?.amount) ?? 0;
    const provisionContingency = Number(values?.provisionContingency) ?? 0;

    if (amount > 0 && provisionContingency > 0) {
      const provisionAmount = (amount * provisionContingency) / 100;

      setValue(
        ExtendedAttributeConfig.provisionAmount,
        provisionAmount.toFixed(2),
      );
    }
  };

  const calculatePlaintiff = () => {
    const values = getValues();
    const initPlaintiff: string = values?.plaintiff ?? "";

    if (typeof initPlaintiff === "string") {
      const plaintiff: number[] =
        initPlaintiff.split(",").map((v) => Number(v)) ?? [];

      if (plaintiff.length > 0) {
        setValue(ExtendedAttributeConfig.plaintiff, plaintiff);
      }
    }
  };

  // Watch fields for changes
  const watchFields = watch(["contingencyPercentage"]);

  useEffect(() => {
    calculateContingencyLevel();
    calculateProvision();
    calculatePlaintiff();
    calculateProvisionPercentage();
  }, [watchFields]);

  return (
    <>
      <ReactiveNumericField
        className="col-span-6"
        control={control}
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">%</span>
          </div>
        }
        errors={errors}
        label="Porcentaje de contingencia estimado"
        max={100}
        min={0}
        name="contingencyPercentage"
        register={register}
      />

      <DynamicAutocomplete
        disabled
        className="col-span-6 nextui-input-nomodal"
        control={control}
        errors={errors}
        label="Nivel de contigencia"
        name="contingencyLevel"
        optionValue="slug"
        register={register}
        slug={MasterOptionConfig["nivel-contingencia"]}
      />

      <ReactiveSwitch
        className="col-span-12"
        control={control}
        isSelected={isProvisional}
        label="¿Acepta provisión?"
        name="isProvisional"
        register={register}
        onValueChange={setIsProvisional}
      />

      {isProvisional && (
        <>
          <ReactiveNumericField
            disabled
            className="col-span-6"
            control={control}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">%</span>
              </div>
            }
            errors={errors}
            label="Provisión estimada"
            max={100}
            min={0}
            name="provisionContingency"
            register={register}
          />

          <ReactiveNumericField
            disabled
            className="col-span-6"
            control={control}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">S/.</span>
              </div>
            }
            errors={errors}
            label="Monto provisionado"
            name="provisionAmount"
            register={register}
          />
        </>
      )}

      {!isProvisional && (
        <>
          <ReactiveFieldFile
            className="col-span-12 [&_.custom-file-wrapper]:!border [&_.custom-file-wrapper]:!border-slate-200"
            control={control}
            defaultValue={provision?.guaranteeLetter ?? ""}
            label="Adjuntar carta de fianza"
            name="guaranteeLetter"
          />

          <ReactiveTextArea
            className="col-span-12 nextui-textarea-nomodal"
            control={control}
            errors={errors}
            label="Comentarios"
            name="comment"
            register={register}
          />
        </>
      )}
    </>
  );
};

export default ProvisionCheck;
