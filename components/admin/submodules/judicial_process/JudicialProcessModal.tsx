import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import React, { FC } from "react";
import { Button } from "@nextui-org/button";
import ReactiveForm from "@/components/form/ReactiveForm";
import ReactiveField from "@/components/form/ReactiveField";
import judicialProcessSchema from "@/app/validations/create-judicial-process.validation";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import CargoStudioAutocomplete from "@/components/shared/master-options-autocompletes/CargoStudioAutocomplete";

export interface JudicialProcessModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any) => void;
  judicialProcess?: GetJudicialProcessDto;
}

const JudicialProcessModal: FC<JudicialProcessModalProps> = ({
  isOpen,
  onOpenChange,
  onCloseChange,
  handleSubmit,
  title,
  judicialProcess,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="xl"
    >
      <ReactiveForm
        onSubmit={handleSubmit}
        validationSchema={judicialProcessSchema}
        initialValues={judicialProcess}
        options={{
          mode: "onTouched",
        }}
      >
        {({ register, errors, isValid, touchedFields, control }) => (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-12 gap-4">
                    <ReactiveField
                      isRequired={true}
                      name="fileCode"
                      label="Código de Expediente"
                      register={register}
                      errors={errors}
                      touched={touchedFields.fileCode}
                      className="col-span-12"
                    />
                    <ReactiveField
                      isRequired={true}
                      name="demanded"
                      label="Demandado"
                      register={register}
                      errors={errors}
                      touched={touchedFields.demanded}
                      className="col-span-4"
                    />
                    <ReactiveField
                      isRequired={true}
                      name="plaintiff"
                      label="Demandante"
                      register={register}
                      errors={errors}
                      touched={touchedFields.plaintiff}
                      className="col-span-4"
                    />
                    <ReactiveField
                      name="coDefendant"
                      label="Co Demandado"
                      register={register}
                      errors={errors}
                      className="col-span-4"
                    />
                    <CargoStudioAutocomplete
                      isRequired={true}
                      name="cargoStudioId"
                      label="Estudio a cargo"
                      className="col-span-12"
                      control={control}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="default"
                    variant="light"
                    onPress={onCloseChange}
                  >
                    Cerrar
                  </Button>
                  <Button
                    className="standard-btn text-white"
                    type="submit"
                    disabled={!isValid}
                  >
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        )}
      </ReactiveForm>
    </Modal>
  );
};

export default JudicialProcessModal;
