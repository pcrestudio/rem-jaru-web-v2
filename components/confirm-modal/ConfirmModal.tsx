import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import React, { FC } from "react";
import { Button } from "@nextui-org/button";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  description: { __html: string | TrustedHTML };
  title: string;
  onConfirm: () => Promise<void>;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
}) => {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <h1 dangerouslySetInnerHTML={description} />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onClick={onClose}>
                Cancelar
              </Button>
              <Button className="standard-btn text-white" onClick={onConfirm}>
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
