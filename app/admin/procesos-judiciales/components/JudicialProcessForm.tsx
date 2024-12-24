import React, { FC } from "react";
import { Button } from "@nextui-org/button";
import { Alert } from "@nextui-org/alert";
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

interface JudicialProcessFormProps {
  handleSubmit?: (data: any, reset: any, event: any) => void;
  judicialProcess?: GetJudicialProcessDto;
  pathname?: string;
}

const JudicialProcessForm: FC<JudicialProcessFormProps> = ({
  judicialProcess,
  pathname,
  handleSubmit,
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
      }) => (
        <div className="grid grid-cols-12 gap-4">
          <ReactiveField
            className="col-span-6 nextui-input-nomodal"
            control={control}
            errors={errors}
            isRequired={true}
            label="Código de Expediente"
            name="fileCode"
            register={register}
            touched={touchedFields.fileCode}
          />
          <ReactiveField
            className="col-span-6 nextui-input-nomodal"
            control={control}
            errors={errors}
            isRequired={true}
            label="Demandado"
            name="demanded"
            register={register}
            touched={touchedFields.demanded}
          />
          <ReactiveField
            className="col-span-6 nextui-input-nomodal"
            control={control}
            errors={errors}
            isRequired={true}
            label="Demandante"
            name="plaintiff"
            register={register}
            touched={touchedFields.plaintiff}
          />
          <ReactiveField
            className="col-span-6 nextui-input-nomodal"
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
            label="Proyectos"
            name="projectId"
            slug={MasterOptionConfig.proyectos}
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
          {judicialProcess && judicialProcess?.entityReference && (
            <>
              <GlobalAttributeFields
                control={control}
                entityReference={judicialProcess?.entityReference}
                getValues={getValues}
                pathname={pathname}
                register={register}
                reset={reset}
              />

              <SectionAttributeFields
                control={control}
                entityReference={judicialProcess?.entityReference}
                getValues={getValues}
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
                />
              </div>
            </>
          )}

          <Button
            className="standard-btn text-white col-span-12 w-fit"
            disabled={!isValid}
            type="submit"
          >
            {judicialProcess && judicialProcess.entityReference
              ? "Guardar y continuar"
              : "Guardar"}
          </Button>
        </div>
      )}
    </ReactiveForm>
  );
};

export default JudicialProcessForm;
