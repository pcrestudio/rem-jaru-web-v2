// useReactiveForm.ts
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface FormValues {
  [key: string]: any;
}

export const useReactiveForm = (validationSchema: Yup.ObjectSchema<any>) => {
  const {
    register,
    control,
    reset,
    getValues,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  return {
    register,
    errors,
    isValid,
    touchedFields,
    control,
    reset,
    getValues,
  };
};
