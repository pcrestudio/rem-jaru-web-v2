import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import React, { FC, FormEvent, ReactNode } from "react";
import ReusableForm from "@/components/form/ReusableForm";
import { Button } from "@nextui-org/button";

export interface JudicialProcessModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  judicialFields: ReactNode;
  title: string;
  handleSubmit?: (event: FormEvent) => void;
  isFormValid?: boolean;
}

const JudicialProcessModal: FC<JudicialProcessModalProps> = ({
  isOpen,
  onClose,
  judicialFields,
  handleSubmit,
  isFormValid,
  title,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <ReusableForm handleSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{judicialFields}</ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                className="standard-btn text-white"
                type="submit"
                disabled={!isFormValid}
              >
                Guardar
              </Button>
            </ModalFooter>
          </ReusableForm>
        )}
      </ModalContent>
    </Modal>
  );
};

export default JudicialProcessModal;
