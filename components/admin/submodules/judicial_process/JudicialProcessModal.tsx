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

export interface JudicialProcessModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  title: string;
  handleSubmit?: (data: any) => void;
  judicialProcess?: GetJudicialProcessDto;
}

const JudicialProcessModal: FC<JudicialProcessModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  title,
  judicialProcess,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" size="xl">
      <ReactiveForm
        onSubmit={handleSubmit}
        validationSchema={judicialProcessSchema}
        options={{ mode: "onTouched" }}
        initialValues={judicialProcess}
      >
        {({ register, errors, isValid, touchedFields }) => (
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
                      isRequired={true}
                      name="coDefendant"
                      label="Co Demandado"
                      register={register}
                      errors={errors}
                      className="col-span-4"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
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
