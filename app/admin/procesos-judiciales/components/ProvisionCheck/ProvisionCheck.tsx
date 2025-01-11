import React, { FC, useEffect, useState } from "react";

import ReactiveSwitch from "@/components/form/ReactiveSwitch";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import ReactiveFieldFile from "@/components/form/ReactiveFieldFile";
import GlobalAttributeFields from "@/components/shared/global-attribute-fields/GlobalAttributeFields";

interface ProvisionCheckProps {
  control: any;
  judicialProcess: GetJudicialProcessDto;
  register: any;
  pathname: string;
  getValues: any;
  reset: any;
  setValue: any;
  watch: any;
}

const ProvisionCheck: FC<ProvisionCheckProps> = ({
  control,
  register,
  judicialProcess,
  pathname,
  getValues,
  reset,
  setValue,
  watch,
}) => {
  const [isProvisional, setIsProvisional] = useState<boolean>(
    judicialProcess?.isProvisional ?? false,
  );
  const calculateProvision = () => {
    const values = getValues();

    const globalKeys = Object.keys(values).filter((key) =>
      key.includes("-global-"),
    );
    const globalData = globalKeys.reduce((acc, key) => {
      acc[key] = values[key];
      return acc;
    }, {});

    const amountKey = Object.keys(globalData).find((key) =>
      key.includes("amount-global-FLOAT"),
    );
    const contingencyKey = Object.keys(globalData).find((key) =>
      key.includes("provisionContingency-global-INTEGER"),
    );
    const provisionKey = Object.keys(globalData).find((key) =>
      key.includes("provisionAmount-global-FLOAT"),
    );

    if (amountKey && contingencyKey && provisionKey) {
      const amount = parseFloat(globalData[amountKey]) || 0;
      const contingencyPercentage = parseFloat(globalData[contingencyKey]) || 0;

      if (amount > 0 && contingencyPercentage > 0) {
        const provisionAmount = (amount * contingencyPercentage) / 100;

        setValue(provisionKey, provisionAmount.toFixed(2));
      } else {
        console.warn("Valores insuficientes para calcular la provisión");
      }
    } else {
      console.error("No se encontraron las claves necesarias en globalData");
    }
  };

  const watchFields = watch([
    "amount-global-FLOAT",
    "provisionContingency-global-INTEGER",
  ]);

  useEffect(() => {
    calculateProvision();
  }, [watchFields]);

  return (
    <>
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
        <GlobalAttributeFields
          control={control}
          entityReference={judicialProcess?.entityReference}
          getValues={getValues}
          pathname={pathname}
          register={register}
          reset={reset}
          isConditionalRender
        />
      )}

      {!isProvisional && (
        <ReactiveFieldFile
          className="col-span-12 [&_.custom-file-wrapper]:!border [&_.custom-file-wrapper]:!border-slate-200"
          control={control}
          isRequired={true}
          defaultValue={judicialProcess?.guaranteeLetter ?? ""}
          label="Adjuntar carta de fianza"
          name="guaranteeLetter"
        />
      )}
    </>
  );
};

export default ProvisionCheck;
