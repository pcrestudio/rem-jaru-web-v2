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
    watch,
    setValue,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    shouldUnregister: false,
  });

  return {
    register,
    errors,
    isValid,
    touchedFields,
    control,
    reset,
    watch,
    getValues,
    setValue,
  };
};
