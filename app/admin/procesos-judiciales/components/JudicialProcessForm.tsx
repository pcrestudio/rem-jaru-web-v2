import React, { FC } from "react";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import judicialProcessSchema from "@/app/validations/create-judicial-process.validation";
import ReactiveField from "@/components/form/ReactiveField";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";
import SectionAttributeFields from "@/components/shared/section-attribute-fields/SectionAttributeFields";
import ReactiveForm from "@/components/form/ReactiveForm";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import DynamicStepper from "@/components/shared/dynamic-stepper/DynamicStepper";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetCejDossierDetailDto } from "@/app/dto/cej/get-cej-dossier-detail.dto";
import GlobalAttributeFields from "@/components/shared/global-attribute-fields/GlobalAttributeFields";
import ResponsibleAutocomplete from "@/components/autocompletes/ResponsibleAutocomplete";
import ProvisionCheck from "@/app/admin/procesos-judiciales/components/ProvisionCheck/ProvisionCheck";
import { ModelType } from "@/config/model-type.config";

interface JudicialProcessFormProps {
  handleSubmit?: (data: any, reset: any, event: any) => void;
  handleStepSubmit?: () => void;
  judicialProcess?: GetJudicialProcessDto;
  pathname?: string;
}

const JudicialProcessForm: FC<JudicialProcessFormProps> = ({
  judicialProcess,
  pathname,
  handleSubmit,
  handleStepSubmit,
}) => {
  const { data } = useSWR<GetCejDossierDetailDto>(
    `${environment.baseUrl}/cej/detail?fileCode=${judicialProcess?.fileCode}`,
    fetcher,
  );
  const router = useRouter();

  return (
    <ReactiveForm
      formId="judicial-process-edit"
      initialValues={judicialProcess}
      validationSchema={judicialProcessSchema}
      onSubmit={handleSubmit}
    >
      {({
        register,
        errors,
        touchedFields,
        control,
        isValid,
        reset,
        getValues,
        setValue,
        watch,
      }) => (
        <div className="grid grid-cols-12 gap-4">
          <ReactiveField
            className="col-span-12"
            control={control}
            errors={errors}
            isRequired={true}
            label="Código de Expediente"
            name="fileCode"
            register={register}
            touched={touchedFields.fileCode}
          />
          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            isRequired={true}
            label="Demandado"
            name="demanded"
            register={register}
            touched={touchedFields.demanded}
          />
          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            isRequired={true}
            label="Demandante"
            name="plaintiff"
            register={register}
            touched={touchedFields.plaintiff}
          />
          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            label="Co Demandado"
            name="coDefendant"
            register={register}
          />
          <DynamicAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Proyecto"
            name="projectId"
            slug={MasterOptionConfig.proyectosGeneral}
          />
          <DynamicAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Estudio a cargo"
            name="cargoStudioId"
            slug={MasterOptionConfig.estudios}
          />
          <DynamicAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Materia controvertida"
            name="controversialMatter"
            optionValue="name"
            slug={MasterOptionConfig.materia}
          />
          <ResponsibleAutocomplete
            className="col-span-4 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Responsable principal"
            name="responsibleId"
          />
          <ResponsibleAutocomplete
            className="col-span-4 nextui-input-nomodal"
            control={control}
            isRequired={false}
            label="Responsable secundario"
            name="secondaryResponsibleId"
          />

          <ReactiveField
            className="col-span-4"
            control={control}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            errors={errors}
            isRequired={true}
            label="Cuantía"
            name="amount"
            register={register}
            touched={touchedFields.amount}
            type="number"
          />

          {judicialProcess && judicialProcess?.entityReference && (
            <>
              <ProvisionCheck
                control={control}
                getValues={getValues}
                pathname={pathname}
                provision={judicialProcess}
                register={register}
                reset={reset}
                setValue={setValue}
                watch={watch}
              />

              <GlobalAttributeFields
                control={control}
                entityReference={judicialProcess?.entityReference}
                getValues={getValues}
                modelType={ModelType.JudicialProcess}
                pathname={pathname}
                register={register}
                reset={reset}
              />

              <SectionAttributeFields
                control={control}
                entityReference={judicialProcess?.entityReference}
                getValues={getValues}
                modelType={ModelType.JudicialProcess}
                pathname={pathname}
                register={register}
                reset={reset}
              />

              <div className="col-span-12">
                <Alert
                  color={data?.updated ? "primary" : "warning"}
                  description={data?.alternativeMessage}
                  endContent={
                    <div className="flex my-auto">
                      <Button
                        className="bg-transparent"
                        color={data?.updated ? "primary" : "warning"}
                        size="sm"
                        variant="flat"
                        onClick={() => {
                          const currentPath = window.location.pathname;
                          const cej_route = currentPath.replace(
                            /edit\/\d+/,
                            "cej",
                          );

                          router.push(
                            `${cej_route}/${judicialProcess?.fileCode}`,
                          );
                        }}
                      >
                        Ver detalle
                      </Button>
                    </div>
                  }
                  title={data?.message}
                />
              </div>

              <div className="col-span-12 mt-4">
                <DynamicStepper
                  entityReference={judicialProcess?.entityReference}
                  modelType={ModelType.JudicialProcess}
                />
              </div>
            </>
          )}

          <div className="col-span-12 flex flex-row gap-4">
            <Button
              className="standard-btn bg-red-500 text-white w-fit"
              disabled={!isValid}
              type="submit"
            >
              {judicialProcess && judicialProcess.entityReference
                ? "Editar ficha"
                : "Guardar ficha"}
            </Button>

            {judicialProcess && judicialProcess?.entityReference && (
              <Button
                className="word-btn bg-red-500 text-white w-fit"
                type="button"
                onClick={handleStepSubmit}
              >
                Guardar y continuar paso
              </Button>
            )}
          </div>
        </div>
      )}
    </ReactiveForm>
  );
};

export default JudicialProcessForm;
