"use client";

import React, { FC } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import ReactiveForm from "@/components/form/ReactiveForm";
import ReactiveField from "@/components/form/ReactiveField";
import masterOptionSchema from "@/app/validations/create-master-option.validation";
import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";

export interface MasterOptionModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  title: string;
  handleSubmit?: (payload: any) => void;
  masterId?: number;
  masterOption?: GetMasterOptionsDto;
}

const MasterOptionModal: FC<MasterOptionModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  title,
  masterId,
  masterOption,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ReactiveForm
        onSubmit={handleSubmit}
        validationSchema={masterOptionSchema}
        options={{ mode: "onTouched" }}
        initialValues={masterOption}
      >
        {({ register, errors, isValid, touchedFields }) => (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
                <ModalBody>
                  <input
                    type="hidden"
                    {...register("masterId")}
                    value={masterId}
                  />
                  <ReactiveField
                    isRequired={true}
                    name="name"
                    label="Nombre"
                    register={register}
                    errors={errors}
                    touched={touchedFields.name}
                  />
                  <ReactiveField
                    isRequired={true}
                    name="slug"
                    label="Slug"
                    register={register}
                    errors={errors}
                    touched={touchedFields.slug}
                  />
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

export default MasterOptionModal;
