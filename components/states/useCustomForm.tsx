import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import validateErrorMessages from "@/utils/validate_error_messages";
import { CustomFormField } from "@/components/form/ReusableFields";

export interface UseCustomFormProps {
  inputValid: Record<string, boolean>;
  errors: Record<string, string>;
  handleSubmit: (event: FormEvent) => Record<string, string>;
  isFormValid: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlurChange: (event: FocusEvent<HTMLInputElement>) => void;
  setFormData: Dispatch<SetStateAction<Record<string, string>>>;
  resetFormData: () => void;
}

const useCustomForm = (fields: CustomFormField[]): UseCustomFormProps => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  );
  const fieldsRef = useRef(fields);

  const [errors, setErrors] = useState<
    Record<string, string | null | undefined>
  >(fields.reduce((acc, field) => ({ ...acc, [field.name]: null }), {}));

  const [, setTouched] = useState<Record<string, boolean>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: false }), {}),
  );

  const [inputValid, setInputValid] = useState<Record<string, boolean>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: false }), {}),
  );

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const validateInputForm = (
    field: CustomFormField | undefined,
    name: string,
    value: string,
  ) => {
    if (field?.validate) {
      const error = validateErrorMessages(field, value);

      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
      setInputValid((prevValid) => ({ ...prevValid, [name]: error !== null }));
    } else {
      const error = validateErrorMessages(field, value);

      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
      setInputValid((prevValid) => ({ ...prevValid, [name]: error !== null }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    const field = fields.find((f) => f.name === name);

    validateInputForm(field, name, value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    const field = fields.find((f) => f.name === name);

    validateInputForm(field, name, value);
  };

  const onSubmit = (formData: Record<string, string>) => {
    return formData;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      return onSubmit(formData);
    }

    return {};
  };

  useEffect(() => {
    const noErrors = Object.values(errors).every((error) => error === null);
    const allFieldsFilled = fieldsRef.current.every(
      (field) => !field.required || formData[field.name].trim() !== "",
    );

    setIsFormValid(noErrors && allFieldsFilled);
  }, [formData, errors]);

  const resetFormData = () => {
    setFormData(
      fields.reduce(
        (acc, field) => {
          acc[field.name] = field.value || "";

          return acc;
        },
        {} as Record<string, string>,
      ),
    );
    setErrors(
      fields.reduce(
        (acc, field) => {
          acc[field.name] = null;

          return acc;
        },
        {} as Record<string, string>,
      ),
    );
    setInputValid(
      fields.reduce(
        (acc, field) => {
          acc[field.name] = false;

          return acc;
        },
        {} as Record<string, boolean>,
      ),
    );
  };

  return {
    handleSubmit,
    isFormValid,
    inputValid,
    errors,
    onInputChange: handleChange,
    onBlurChange: handleBlur,
    setFormData,
    resetFormData,
  };
};

export default useCustomForm;
