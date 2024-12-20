import { FC } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import ReactiveForm, {
  ReactiveFormProps,
} from "@/components/form/ReactiveForm";
import { Button } from "@nextui-org/button";

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
      open={isOpen}
      fullWidth
      PaperProps={{
        className: "!rounded-2xl",
      }}
    >
      <DialogTitle className="text-cerulean-950 font-bold !text-lg">
        {title}
      </DialogTitle>
      <ReactiveForm
        onSubmit={(values, reset, event) => onSubmit(values, reset, event)}
        validationSchema={validationSchema}
        initialValues={initialValues}
        stopEventPropagation={stopEventPropagation}
        formId={formId}
        options={{
          mode: "onTouched",
        }}
      >
        {({ register, errors, touchedFields, control, isValid, reset }) => (
          <>
            {children({
              register,
              errors,
              touchedFields,
              control,
              isValid,
              reset,
            })}
            <DialogActions className="!px-6 !pt-4">
              <Button onClick={onCloseChange} className="bg-transparent">
                Cancelar
              </Button>
              <Button
                type="submit"
                className="standard-btn text-white"
                disabled={!isValid}
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
