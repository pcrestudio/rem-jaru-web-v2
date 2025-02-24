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
    const amount = reclaims?.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    if (value !== null) {
      const savingAmount = amount - Number(value);

      setValue(
        `${ExtendedAttributeConfig.savingAmount}`,
        Number(savingAmount).toFixed(2),
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

    const percentage = (provisionAmount / amount) * 100;

    setValue(
      `${ExtendedAttributeConfig.provisionAmount}`,
      Number(provisionAmount).toFixed(2),
    );

    setValue(`${ExtendedAttributeConfig.amount}`, Number(amount).toFixed(2));

    setValue(
      ExtendedAttributeConfig.provisionContingency,
      Math.round(percentage),
    );
  };

  const calculateContingencyLevel = (contingencyPercentage: number) => {
    let newLevel = null;
    let shouldBeProvisional = false;

    if (contingencyPercentage > 0 && contingencyPercentage < 10) {
      newLevel = ContingencyLevelConfig.remoto;
      shouldBeProvisional = false;
    } else if (contingencyPercentage >= 10 && contingencyPercentage < 50) {
      newLevel = ContingencyLevelConfig.posible;
      shouldBeProvisional = true;
    } else if (contingencyPercentage >= 50 && contingencyPercentage < 90) {
      newLevel = ContingencyLevelConfig.probable;
      shouldBeProvisional = true;
    } else if (contingencyPercentage >= 90) {
      newLevel = ContingencyLevelConfig.virtualmente;
    }

    if (watch(ExtendedAttributeConfig.contingencyLevel) !== newLevel) {
      setValue(ExtendedAttributeConfig.contingencyLevel, newLevel);
    }

    if (!shouldOverride) {
      setValue(ExtendedAttributeConfig.isProvisional, shouldBeProvisional);
    }

    setAutoProvisional(shouldBeProvisional);
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

  useEffect(() => {
    if (contingencyPercentage !== undefined) {
      calculateContingencyLevel(contingencyPercentage);
      calculateProvision();
      calculateProvisionPercentage();
    }
  }, [contingencyPercentage]);

  return (
    <>
      {values?.isProvisional && (
        <>
          <ReactiveNumericField
            readOnly
            className="col-span-4"
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
            className="col-span-4"
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
            readOnly
            className="col-span-4"
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
            className="col-span-6"
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
            className="col-span-6"
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
      )}

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

      {!values?.isProvisional && (
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
