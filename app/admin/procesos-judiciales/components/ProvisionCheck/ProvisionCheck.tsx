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
import debounce from "@/utils/custom_debounce";
import isArrayNull from "@/utils/is_array_null";

const ProvisionCheck: FC<ModularProps> = ({
  control,
  register,
  provision,
  getValues,
  setValue,
  watch,
}) => {
  const values = getValues();
  const reclaims = watch("reclaims");
  const isProvisional = watch("isProvisional");
  const [autoProvisional, setAutoProvisional] = useState(false);
  const [shouldOverride, setShouldOverride] = useState(false);
  const contingencyPercentage = watch("contingencyPercentage");

  const handleChange = (value: number | string | object) => {
    const amount = !isArrayNull(reclaims)
      ? reclaims?.reduce((sum, item) => sum + Number(item.amount), 0)
      : provision.amount;

    if (value !== null) {
      const savingAmount = amount - Number(value);

      setValue(
        `${ExtendedAttributeConfig.savingAmount}`,
        Math.max(savingAmount, 0).toFixed(2),
      );
    }
  };

  const debounceChange = debounce(handleChange, 300);

  const calculateProvisionPercentage = () => {
    const provisionAmount = reclaims?.reduce(
      (sum, item) => sum + Number(item.provisionAmount),
      0,
    );

    const amount = reclaims?.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    if (amount > 0) {
      setValue(`${ExtendedAttributeConfig.amount}`, Number(amount).toFixed(2));
    }

    const percentage =
      reclaims?.reduce(
        (acumulado, petitorio) => acumulado + petitorio.contingencyPercentage,
        0,
      ) / reclaims?.length;

    setValue(
      `${ExtendedAttributeConfig.provisionAmount}`,
      Number(provisionAmount).toFixed(2),
    );

    setValue(
      ExtendedAttributeConfig.contingencyPercentage,
      Number(percentage).toFixed(2),
    );
  };

  const calculateContingencyLevelFromAmounts = () => {
    let hasProvision = false;
    let hasPossible = false;
    let hasRemote = false;

    for (const reclaim of reclaims || []) {
      const provision = Number(reclaim.provisionAmount) || 0;
      const possible = Number(reclaim.posibleAmount) || 0;
      const remote = Number(reclaim.remoteAmount) || 0;

      if (provision > 0) {
        hasProvision = true;
      } else if (possible > 0) {
        hasPossible = true;
      } else if (remote > 0) {
        hasRemote = true;
      }
    }

    let level = ContingencyLevelConfig.remoto;
    let isProvisional = false;

    if (hasProvision) {
      level = ContingencyLevelConfig.probable;
      isProvisional = true;
    } else if (hasPossible) {
      level = ContingencyLevelConfig.posible;
    }

    setValue(ExtendedAttributeConfig.contingencyLevel, level);

    if (!shouldOverride) {
      setValue(ExtendedAttributeConfig.isProvisional, isProvisional);
    }

    setAutoProvisional(isProvisional);
  };

  const calculateProvision = () => {
    const amount = parseFloat(values?.reclaims) ?? 0;
    const provisionContingency = Number(values?.provisionContingency) ?? 0;

    if (amount > 0 && provisionContingency > 0) {
      const provisionAmount = (amount * provisionContingency) / 100;

      setValue(
        ExtendedAttributeConfig.provisionAmount,
        provisionAmount.toFixed(2),
      );
    }
  };

  useEffect(() => {
    if (contingencyPercentage !== undefined) {
      calculateProvision();
      calculateProvisionPercentage();
    }
  }, [contingencyPercentage]);

  useEffect(() => {
    calculateContingencyLevelFromAmounts();
    calculateProvisionPercentage();
  }, [reclaims]);

  return (
    <>
      <>
        <ReactiveNumericField
          readOnly
          className="col-span-12 md:col-span-6"
          control={control}
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small" />
            </div>
          }
          errors={errors}
          isRequired={true}
          label="Monto demandado"
          name="amount"
          register={register}
          type="number"
        />

        <ReactiveNumericField
          readOnly
          className="col-span-12 md:col-span-6"
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

        <ReactiveNumericField
          className="col-span-12 md:col-span-6"
          control={control}
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">S/.</span>
            </div>
          }
          errors={errors}
          label="Monto pagado"
          name="paidAmount"
          register={register}
          onChange={debounceChange}
        />

        <ReactiveNumericField
          readOnly
          className="col-span-12 md:col-span-6"
          control={control}
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">S/.</span>
            </div>
          }
          errors={errors}
          label="Ahorro generado"
          name="savingAmount"
          register={register}
        />
      </>

      <DynamicAutocomplete
        disabled
        className="col-span-12 md:col-span-12 nextui-input-nomodal"
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
        isSelected={
          isProvisional !== undefined ? isProvisional : autoProvisional
        }
        label="¿Se exceptúa de provisión?"
        name="isProvisional"
        register={register}
        onValueChange={(value) => {
          setShouldOverride(true);
          setValue(ExtendedAttributeConfig.isProvisional, value);
        }}
      />

      {values?.isProvisional && (
        <>
          <ReactiveTextArea
            className="col-span-12 nextui-textarea-nomodal"
            control={control}
            errors={errors}
            label="Comentarios"
            name="comment"
            register={register}
          />

          <ReactiveFieldFile
            className="col-span-12 [&_.custom-file-wrapper]:!border [&_.custom-file-wrapper]:!border-slate-200"
            control={control}
            defaultValue={provision?.guaranteeLetter ?? ""}
            label="Adjuntar carta de fianza"
            name="guaranteeLetter"
          />
        </>
      )}
    </>
  );
};

export default ProvisionCheck;
