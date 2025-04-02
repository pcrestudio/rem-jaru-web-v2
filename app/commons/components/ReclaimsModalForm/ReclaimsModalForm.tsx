import React, { FC, useState } from "react";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";
import { ModalProps } from "@/app/admin/types/ModalProps";
import ReactiveNumericField, {
  suffixNumericContent,
} from "@/components/form/ReactiveNumericField";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";
import { ExtendedAttributeConfig } from "@/config/extended-attribute.config";
import debounce from "@/utils/custom_debounce";
import { ContingencyLevelConfig } from "@/config/contingency-level.config";
import createReclaimSchema from "@/app/validations/create-reclaim.validation";

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
  const [canProvision, setCanProvision] = useState<boolean>(false);

  const handleChange = (value: number | string | object, setValue: any) => {
    const percentage = Number(value);

    setCanProvision(false);

    if (percentage > 0 && percentage < 10) {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.remoto,
      );
    } else if (percentage >= 10 && percentage < 50) {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.posible,
      );
    } else if (percentage >= 50 && percentage <= 100) {
      setValue(
        ExtendedAttributeConfig.contingencyLevel,
        ContingencyLevelConfig.probable,
      );

      setCanProvision(true);
    } else {
      setValue(ExtendedAttributeConfig.contingencyLevel, null);
    }
  };

  const debounceChange = debounce(handleChange, 300);

  return (
    <FormDialog
      formId="reclaims-form"
      initialValues={reclaim || {}}
      isOpen={isOpen}
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={createReclaimSchema}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
    >
      {({ register, errors, control, setValue }) => {
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
              className="col-span-12 lg:col-span-6 placeholder:text-xs text-xs"
              control={control}
              errors={errors}
              label="% de contingencia"
              labelClassName="text-xs"
              min={0}
              name="contingencyPercentage"
              onChange={(value) => debounceChange(value, setValue)}
            />

            <DynamicAutocomplete
              disabled
              className={`col-span-12 nextui-input-nomodal ${canProvision ? "lg:col-span-6" : "lg:col-span-12"}`}
              control={control}
              errors={errors}
              label="Nv. de contigencia"
              name="contingencyLevel"
              optionValue="slug"
              register={register}
              slug={MasterOptionConfig["nivel-contingencia"]}
            />

            {canProvision && (
              <ReactiveNumericField
                className="col-span-4 lg:col-span-6 placeholder:text-xs text-xs"
                control={control}
                endContent={suffixNumericContent({ suffix: "S/." })}
                errors={errors}
                label="Monto provisión"
                labelClassName="text-xs"
                min={0}
                name="provisionAmount"
              />
            )}

            <ReactiveNumericField
              className="col-span-4 lg:col-span-6 placeholder:text-xs text-xs"
              control={control}
              endContent={suffixNumericContent({ suffix: "S/." })}
              errors={errors}
              label="Monto posible"
              labelClassName="text-xs"
              min={0}
              name="posibleAmount"
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
            />
          </div>
        );
      }}
    </FormDialog>
  );
};

export default ReclaimsModalForm;
