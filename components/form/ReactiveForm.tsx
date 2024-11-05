import React, { FC, ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useReactiveForm } from "@/components/states/useReactiveForm";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
  [key: string]: any;
}

interface ReactiveFormProps {
  onSubmit: SubmitHandler<FormValues>;
  validationSchema: Yup.ObjectSchema<any>;
  initialValues?: any;
  children: (props: {
    register: ReturnType<typeof useReactiveForm>["register"];
    errors: ReturnType<typeof useReactiveForm>["errors"];
    isValid: ReturnType<typeof useReactiveForm>["isValid"];
    touchedFields: ReturnType<typeof useReactiveForm>["touchedFields"];
    initialValues: ReturnType<typeof useReactiveForm>["touchedFields"];
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
    formState: { isValid, errors, touchedFields },
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: initialValues || {},
    mode: options?.mode || "onSubmit",
    ...options,
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({
        errors,
        register,
        touchedFields,
        isValid,
        initialValues: initialValues,
      })}
    </form>
  );
};

export default ReactiveForm;
