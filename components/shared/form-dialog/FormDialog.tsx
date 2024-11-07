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
}

const FormDialog: FC<FormDialogProps> = ({
  children,
  onSubmit,
  validationSchema,
  initialValues,
  title,
  isOpen,
  onCloseChange,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCloseChange}
      PaperProps={{
        className: "!rounded-2xl",
      }}
    >
      <DialogTitle className="text-cerulean-950 font-bold !text-lg">
        {title}
      </DialogTitle>
      <ReactiveForm
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        options={{
          mode: "onTouched",
        }}
      >
        {({ register, errors, touchedFields, control, isValid }) => (
          <>
            {children({
              register,
              errors,
              touchedFields,
              control,
              isValid,
              initialValues,
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
                Guardar
              </Button>
            </DialogActions>
          </>
        )}
      </ReactiveForm>
    </Dialog>
  );
};

export default FormDialog;
