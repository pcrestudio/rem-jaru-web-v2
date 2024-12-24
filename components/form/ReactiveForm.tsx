import React, { FC, ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useReactiveForm } from "@/components/states/useReactiveForm";

export interface FormValues {
  [key: string]: any;
}

export interface ReactiveFormProps {
  onSubmit: (values: FormValues, reset: () => void, event?: any) => void;
  validationSchema: Yup.ObjectSchema<any>;
  initialValues?: any;
  children?: (props: {
    register: ReturnType<typeof useReactiveForm>["register"];
    errors: ReturnType<typeof useReactiveForm>["errors"];
    isValid: ReturnType<typeof useReactiveForm>["isValid"];
    touchedFields: ReturnType<typeof useReactiveForm>["touchedFields"];
    control: ReturnType<typeof useReactiveForm>["control"];
    reset: ReturnType<typeof useReactiveForm>["reset"];
    getValues: ReturnType<typeof useReactiveForm>["getValues"];
  }) => ReactNode;
  options?: any;
  stopEventPropagation?: boolean;
  formId?: string;
}

const ReactiveForm: FC<ReactiveFormProps> = ({
  onSubmit,
  validationSchema,
  children,
  options,
  initialValues,
  stopEventPropagation = false,
  formId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: initialValues || {},
    mode: options?.mode || "onSubmit",
    ...options,
  });

  const handleFormSubmit = (
    values: FormValues,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    if (stopEventPropagation) {
      event.stopPropagation();
      event.stopPropagation();
    }
    onSubmit(values, reset, event);
  };

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <form
      id={formId}
      onSubmit={handleSubmit((values, event) =>
        handleFormSubmit(values, event as React.FormEvent<HTMLFormElement>),
      )}
    >
      {children({
        errors,
        register,
        touchedFields,
        isValid,
        control,
        reset,
        getValues,
      })}
    </form>
  );
};

export default ReactiveForm;
