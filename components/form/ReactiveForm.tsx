import React, { FC, ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useReactiveForm } from "@/components/states/useReactiveForm";
import { yupResolver } from "@hookform/resolvers/yup";

export interface FormValues {
  [key: string]: any;
}

export interface ReactiveFormProps {
  onSubmit: (values: FormValues, reset: () => void) => void;
  validationSchema: Yup.ObjectSchema<any>;
  initialValues?: any;
  children?: (props: {
    register: ReturnType<typeof useReactiveForm>["register"];
    errors: ReturnType<typeof useReactiveForm>["errors"];
    isValid: ReturnType<typeof useReactiveForm>["isValid"];
    touchedFields: ReturnType<typeof useReactiveForm>["touchedFields"];
    control: ReturnType<typeof useReactiveForm>["control"];
    reset: ReturnType<typeof useReactiveForm>["reset"];
  }) => ReactNode;
  options?: any;
}

const ReactiveForm: FC<ReactiveFormProps> = ({
  onSubmit,
  validationSchema,
  children,
  options,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: initialValues || {},
    mode: options?.mode || "onSubmit",
    ...options,
  });

  const handleFormSubmit = (values: FormValues) => {
    onSubmit(values, reset);
  };

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {children({
        errors,
        register,
        touchedFields,
        isValid,
        control,
        reset,
      })}
    </form>
  );
};

export default ReactiveForm;
