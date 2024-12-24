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
    <Modal isOpen={isOpen} placement="center" onOpenChange={onClose}>
      <ReactiveForm
        initialValues={masterOption}
        options={{ mode: "onTouched" }}
        validationSchema={masterOptionSchema}
        onSubmit={handleSubmit}
      >
        {({ register, errors, isValid, touchedFields, control }) => (
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
                    control={control}
                    errors={errors}
                    isRequired={true}
                    label="Nombre"
                    name="name"
                    register={register}
                    touched={touchedFields.name}
                  />
                  <ReactiveField
                    control={control}
                    errors={errors}
                    isRequired={true}
                    label="Slug"
                    name="slug"
                    register={register}
                    touched={touchedFields.slug}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    className="standard-btn text-white"
                    disabled={!isValid}
                    type="submit"
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
