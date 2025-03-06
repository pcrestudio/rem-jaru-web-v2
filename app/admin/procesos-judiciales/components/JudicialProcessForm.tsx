import React, { FC } from "react";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import Reclaims from "@/app/commons/components/Reclaims/Reclaims";
import judicialProcessSchema from "@/app/validations/create-judicial-process.validation";
import ReactiveField from "@/components/form/ReactiveField";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";
import SectionAttributeFields from "@/components/shared/section-attribute-fields/SectionAttributeFields";
import ReactiveForm from "@/components/form/ReactiveForm";
import { GetJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/get-judicial-process.dto";
import DynamicStepper from "@/components/shared/dynamic-stepper/DynamicStepper";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetCejDossierDetailDto } from "@/app/dto/cej/get-cej-dossier-detail.dto";
import GlobalAttributeFields from "@/components/shared/global-attribute-fields/GlobalAttributeFields";
import ResponsibleAutocomplete from "@/components/autocompletes/ResponsibleAutocomplete";
import ProvisionCheck from "@/app/admin/procesos-judiciales/components/ProvisionCheck/ProvisionCheck";
import { ModelType } from "@/config/model-type.config";
import mockReclaims from "@/app/admin/procesos-judiciales/constants/reclaims.constant";
import { canUse, CanUsePermission } from "@/utils/can_use_permission";
import useStore from "@/lib/store";
import { labelConfig } from "@/config/label.config";
import { SlugConfig } from "@/config/slug.config";
import Incidences from "@/app/commons/components/Incidences/Incidences";
import { showAllDossiers } from "@/config/menu-options";

interface JudicialProcessFormProps {
  handleSubmit?: (data: any, reset: any, event: any) => void;
  handleStepSubmit?: () => void;
  judicialProcess?: GetJudicialProcessDto;
  pathname?: string;
  slug: string;
}

const JudicialProcessForm: FC<JudicialProcessFormProps> = ({
  judicialProcess,
  pathname,
  handleSubmit,
  handleStepSubmit,
  slug,
}) => {
  const { data } = useSWR<GetCejDossierDetailDto>(
    `${environment.baseUrl}/cej/detail?fileCode=${judicialProcess?.fileCode}`,
    fetcher,
  );
  const router = useRouter();
  const { user } = useStore();

  return (
    <ReactiveForm
      formId="judicial-process-edit"
      initialValues={{
        ...judicialProcess,
        reclaims:
          judicialProcess?.reclaims?.length > 0
            ? judicialProcess.reclaims
            : mockReclaims,
      }}
      options={{
        mode: "onTouched",
      }}
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
            isRequired={slug !== SlugConfig.judicial_process_criminal}
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
            label={labelConfig[slug]["plaintiff"]}
            name="plaintiff"
            register={register}
            touched={touchedFields.plaintiff}
          />

          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            isRequired={true}
            label={labelConfig[slug]["demanded"]}
            name="demanded"
            register={register}
            touched={touchedFields.demanded}
          />

          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            label={labelConfig[slug]["coDefendant"]}
            name="coDefendant"
            register={register}
          />

          <DynamicAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Razón social"
            name="projectId"
            slug={MasterOptionConfig.proyectosGeneral}
          />

          <ResponsibleAutocomplete
            className={`nextui-input-nomodal ${!judicialProcess ? "col-span-6" : "col-span-6"}`}
            control={control}
            isRequired={true}
            label="Responsable principal"
            name="responsibleId"
          />

          <ResponsibleAutocomplete
            className={`nextui-input-nomodal ${!judicialProcess ? "col-span-6" : "col-span-6"}`}
            control={control}
            isRequired={false}
            label="Responsable secundario"
            name="secondaryResponsibleId"
          />

          {Object.keys.length > 0 &&
            showAllDossiers.includes(user?.role) &&
            user.studioId === 0 && (
              <DynamicAutocomplete
                className="col-span-6 nextui-input-nomodal"
                control={control}
                isRequired={true}
                label="Estudio"
                name="cargoStudioId"
                optionValue="id"
                slug={MasterOptionConfig.estudios}
              />
            )}

          <DynamicAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Moneda"
            name="controversialMatter"
            optionValue="name"
            slug={MasterOptionConfig.moneda}
          />

          <DynamicAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            label="Status"
            name="statusId"
            optionValue="id"
            slug={MasterOptionConfig.status}
          />

          {judicialProcess && judicialProcess?.entityReference && (
            <>
              <GlobalAttributeFields
                control={control}
                entityReference={judicialProcess?.entityReference}
                getValues={getValues}
                modelType={ModelType.JudicialProcess}
                pathname={pathname}
                register={register}
                reset={reset}
              />
              <div className="col-span-12 flex flex-col gap-4">
                <Reclaims
                  control={control}
                  errors={errors}
                  getValues={getValues}
                  modelType={ModelType.JudicialProcess}
                  pathname={pathname}
                  provision={judicialProcess}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              </div>
              <ProvisionCheck
                control={control}
                getValues={getValues}
                pathname={pathname}
                provision={judicialProcess as GetJudicialProcessDto}
                register={register}
                reset={reset}
                setValue={setValue}
                watch={watch}
              />
              <SectionAttributeFields
                control={control}
                entityReference={judicialProcess?.entityReference}
                errors={errors}
                getValues={getValues}
                modelType={ModelType.JudicialProcess}
                pathname={pathname}
                provision={judicialProcess}
                register={register}
                reset={reset}
                setValue={setValue}
                watch={watch}
              />

              <Incidences
                entityReference={judicialProcess?.entityReference}
                modelType={ModelType.JudicialProcess}
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
                        onPress={() => {
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
              isDisabled={
                !isValid || !canUse(user.role, CanUsePermission.editItem)
              }
              type="submit"
            >
              {judicialProcess && judicialProcess.entityReference
                ? "Editar ficha"
                : "Guardar ficha"}
            </Button>

            {judicialProcess && judicialProcess?.entityReference && (
              <Button
                className="word-btn bg-red-500 text-white w-fit"
                isDisabled={!canUse(user.role, CanUsePermission.editItem)}
                type="button"
                onPress={handleStepSubmit}
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
