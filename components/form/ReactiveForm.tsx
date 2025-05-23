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
    setValue: ReturnType<typeof useReactiveForm>["setValue"];
    watch?: ReturnType<typeof useReactiveForm>["watch"];
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
    watch,
    setValue,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: initialValues || {},
    mode: options?.mode || "onSubmit",
    ...options,
    shouldUnregister: false,
  });

  const handleFormSubmit = (
    values: FormValues,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    if (stopEventPropagation) {
      event.stopPropagation();
    }
    onSubmit(values, reset, event);
  };

  useEffect(() => {
    if (Object.keys(initialValues || {}).length > 0) {
      reset(initialValues);
    }
  }, [initialValues]);

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
        watch,
        setValue,
      })}
    </form>
  );
};

export default ReactiveForm;
