import { FC } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Button } from "@nextui-org/button";

import ReactiveForm, {
  ReactiveFormProps,
} from "@/components/form/ReactiveForm";

interface FormDialogProps extends ReactiveFormProps {
  title: string;
  isOpen: boolean;
  onCloseChange: () => void;
  buttonSubmitTitle?: string;
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
}) => {
  return (
    <Dialog
      fullWidth
      PaperProps={{
        className: "!rounded-2xl",
      }}
      open={isOpen}
    >
      <DialogTitle className="text-cerulean-950 font-bold !text-lg">
        {title}
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
            })}
            <DialogActions className="!px-6 !pt-4">
              <Button className="bg-transparent" onClick={onCloseChange}>
                Cancelar
              </Button>
              <Button
                className="standard-btn text-white"
                disabled={!isValid}
                type="submit"
              >
                {buttonSubmitTitle}
              </Button>
            </DialogActions>
          </>
        )}
      </ReactiveForm>
    </Dialog>
  );
};

export default FormDialog;
