import React, { FC, useCallback, useEffect, useState } from "react";
import { errors } from "openid-client";

import ReactiveSwitch from "@/components/form/ReactiveSwitch";
import ReactiveFieldFile from "@/components/form/ReactiveFieldFile";
import ReactiveTextArea from "@/components/form/ReactiveTextArea";
import ReactiveNumericField from "@/components/form/ReactiveNumericField";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";
import { ExtendedAttributeConfig } from "@/config/extended-attribute.config";
import { ModularProps } from "@/app/admin/procesos-judiciales/types/ModularProps";

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

  // Calculate contingency level
  const calculateContingencyLevel = useCallback(() => {
    const values = getValues();
    const contingencyPercentage = Number(values?.contingencyPercentage) ?? 0;

    if (contingencyPercentage > 0 && contingencyPercentage < 50) {
      setValue(ExtendedAttributeConfig.contingencyLevel, "remoto", {
        shouldValidate: true,
      });
    } else if (contingencyPercentage >= 50 && contingencyPercentage < 80) {
      setValue(ExtendedAttributeConfig.contingencyLevel, "posible", {
        shouldValidate: true,
      });
      setValue(ExtendedAttributeConfig.isProvisional, true, {
        shouldValidate: true,
      });
      setIsProvisional(true);
    } else if (contingencyPercentage >= 80) {
      setValue(ExtendedAttributeConfig.contingencyLevel, "probable", {
        shouldValidate: true,
      });
      setValue(ExtendedAttributeConfig.isProvisional, true, {
        shouldValidate: true,
      });
      setIsProvisional(true);
    } else {
      setValue(ExtendedAttributeConfig.isProvisional, false, {
        shouldValidate: true,
      });
      setValue(ExtendedAttributeConfig.contingencyLevel, null, {
        shouldValidate: true,
      });
      setIsProvisional(false);
    }
  }, [getValues, setValue]);

  // Calculate provision amount
  const calculateProvision = useCallback(() => {
    const values = getValues();
    const amount = parseFloat(values?.amount) ?? 0;
    const provisionContingency = Number(values?.provisionContingency) ?? 0;

    if (amount > 0 && provisionContingency > 0) {
      const provisionAmount = (amount * provisionContingency) / 100;
      setValue(
        ExtendedAttributeConfig.provisionAmount,
        provisionAmount.toFixed(2),
        { shouldValidate: true },
      );
    }
  }, [getValues, setValue]);

  // Calculate plaintiff
  const calculatePlaintiff = useCallback(() => {
    const values = getValues();
    const initPlaintiff: string = values?.plaintiff ?? "";

    if (typeof initPlaintiff === "string") {
      const plaintiff: number[] =
        initPlaintiff.split(",").map((v) => Number(v)) ?? [];

      if (plaintiff.length > 0) {
        setValue(ExtendedAttributeConfig.plaintiff, plaintiff);
      }
    }
  }, [getValues, setValue]);

  // Watch fields for changes
  const watchFields = watch([
    "contingencyPercentage",
    "amount",
    "provisionContingency",
  ]);

  // Run calculations when watched fields change
  useEffect(() => {
    calculateProvision();
    calculateContingencyLevel();
  }, [watchFields, calculateProvision, calculateContingencyLevel]);

  // Run plaintiff calculation only once on mount
  useEffect(() => {
    calculatePlaintiff();
  }, [calculatePlaintiff]);

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

export default React.memo(ProvisionCheck);
