import { FC, ReactNode } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Button } from "@heroui/button";

import ReactiveForm, {
  ReactiveFormProps,
} from "@/components/form/ReactiveForm";

interface FormDialogProps extends ReactiveFormProps {
  title: string;
  isOpen: boolean;
  onCloseChange: () => void;
  buttonSubmitTitle?: string;
  modalEndContent?: ReactNode;
  modalDialogHeaderContent?: ReactNode;
  canUse?: boolean;
}

const FormDialog: FC<FormDialogProps> = ({
  children,
  onSubmit,
  validationSchema,
  initialValues,
  title,
  isOpen,
  onCloseChange,
  stopEventPropagation = false,
  formId,
  buttonSubmitTitle = "Guardar",
  modalEndContent,
  modalDialogHeaderContent,
  canUse = true,
}) => {
  return (
    <Dialog
      fullWidth
      PaperProps={{
        className: "!rounded-2xl",
      }}
      open={isOpen}
      scroll="paper"
    >
      <DialogTitle
        className="text-cerulean-950 font-bold !text-lg"
        sx={{
          paddingX: modalDialogHeaderContent
            ? "0 !important"
            : "24px !important",
          paddingTop: modalDialogHeaderContent
            ? "0 !important"
            : "16px !important",
        }}
      >
        {modalDialogHeaderContent ? modalDialogHeaderContent : title}
      </DialogTitle>
      <ReactiveForm
        formId={formId}
        initialValues={initialValues}
        options={{
          mode: "onTouched",
        }}
        stopEventPropagation={stopEventPropagation}
        validationSchema={validationSchema}
        onSubmit={(values, reset, event) => onSubmit(values, reset, event)}
      >
        {({
          register,
          errors,
          touchedFields,
          control,
          isValid,
          reset,
          getValues,
          watch,
          setValue,
        }) => (
          <>
            {children({
              register,
              errors,
              touchedFields,
              control,
              isValid,
              reset,
              getValues,
              watch,
              setValue,
            })}
            <DialogActions className="!px-6 !pt-4 flex flex-row gap-2">
              <Button className="bg-transparent" onClick={onCloseChange}>
                Cancelar
              </Button>
              <Button
                className="standard-btn text-white"
                disabled={!canUse || !isValid}
                type="submit"
              >
                {buttonSubmitTitle}
              </Button>
              {modalEndContent}
            </DialogActions>
          </>
        )}
      </ReactiveForm>
    </Dialog>
  );
};

export default FormDialog;
