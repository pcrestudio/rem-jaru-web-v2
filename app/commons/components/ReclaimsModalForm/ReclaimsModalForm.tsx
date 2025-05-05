import React, { FC } from "react";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";
import { ModalProps } from "@/app/admin/types/ModalProps";
import ReactiveNumericField, {
  suffixNumericContent,
} from "@/components/form/ReactiveNumericField";
import debounce from "@/utils/custom_debounce";
import createReclaimSchema from "@/app/validations/create-reclaim.validation";
import { ReclaimConfig } from "@/config/reclaim.config";
import { ContingencyLevelConfig } from "@/config/contingency-level.config";
import { ExtendedAttributeConfig } from "@/config/extended-attribute.config";

interface ReclaimsModalFormProps extends ModalProps {
  reclaim: UpsertReclaimDto;
}

const ReclaimsModalForm: FC<ReclaimsModalFormProps> = ({
  reclaim,
  isOpen,
  stopEventPropagation,
  title,
  onCloseChange,
  handleSubmit,
}) => {
  const handleChange = (
    value: number | string | object,
    key: string,
    setValue: any,
    getValues: any,
  ) => {
    setValue(key, value);

    const formValues = getValues();

    const provisionAmount = Number(formValues.provisionAmount || 0);
    const posibleAmount = Number(formValues.posibleAmount || 0);

    if (provisionAmount > 0) {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.probable,
      );
    } else if (posibleAmount > 0) {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.posible,
      );
    } else {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.remoto,
      );
    }
  };

  const debounceChange = debounce(handleChange, 300);

  return (
    <FormDialog
      formId="reclaims-form"
      initialValues={reclaim || {}}
      isOpen={isOpen}
      options={{
        mode: "onTouched",
      }}
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={createReclaimSchema}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
    >
      {({ errors, control, setValue, getValues }) => {
        return (
          <div className="grid grid-cols-12 gap-4 px-6">
            <ReactiveField
              className="col-span-12 lg:col-span-12"
              control={control}
              errors={errors}
              label="Concepto"
              labelClassName="text-xs"
              name="concept"
            />

            <ReactiveNumericField
              className="col-span-12 lg:col-span-6"
              control={control}
              endContent={suffixNumericContent({ suffix: "S/." })}
              errors={errors}
              label="Monto"
              labelClassName="text-xs"
              min={0}
              name="amount"
            />

            <ReactiveNumericField
              className="col-span-4 lg:col-span-6 placeholder:text-xs text-xs"
              control={control}
              endContent={suffixNumericContent({ suffix: "S/." })}
              errors={errors}
              label="Monto provisión"
              labelClassName="text-xs"
              min={0}
              name="provisionAmount"
              onChange={(value) =>
                debounceChange(
                  value,
                  ReclaimConfig.provisionAmount,
                  setValue,
                  getValues,
                )
              }
            />

            <ReactiveNumericField
              className="col-span-4 lg:col-span-6 placeholder:text-xs text-xs"
              control={control}
              endContent={suffixNumericContent({ suffix: "S/." })}
              errors={errors}
              label="Monto posible"
              labelClassName="text-xs"
              min={0}
              name="posibleAmount"
              onChange={(value) =>
                debounceChange(
                  value,
                  ReclaimConfig.posibleAmount,
                  setValue,
                  getValues,
                )
              }
            />

            <ReactiveNumericField
              className="col-span-4 lg:col-span-6 placeholder:text-xs text-xs"
              control={control}
              endContent={suffixNumericContent({ suffix: "S/." })}
              errors={errors}
              label="Monto remoto"
              labelClassName="text-xs"
              min={0}
              name="remoteAmount"
              onChange={(value) =>
                debounceChange(
                  value,
                  ReclaimConfig.remoteAmount,
                  setValue,
                  getValues,
                )
              }
            />
          </div>
        );
      }}
    </FormDialog>
  );
};

export default ReclaimsModalForm;
