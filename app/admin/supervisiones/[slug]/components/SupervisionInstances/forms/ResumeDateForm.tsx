import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Textarea } from "@heroui/input";
import { ZonedDateTime } from "@internationalized/date";
import { DatePicker } from "@heroui/react";

import TodoStepDataGrid from "@/app/admin/todos/components/todo-step-datagrid/TodoStepDataGrid";
import { handleDownloadDocument } from "@/app/helpers/downloadDocumentHelper";
import { GenericFormProps } from "@/app/admin/supervisiones/[slug]/components/SupervisionInstances/forms/GenericForm";
import { convertToZonedDateTime } from "@/utils/format_date";
import parseValueToZonedDateTime from "@/config/parse_date_value.config";

export interface ResumeDateFormProps extends GenericFormProps {
  textAreaLabel?: string;
  fileLabel?: string;
  datePickerLabel?: string;
  withTodos?: boolean;
}

const ResumeDateForm: FC<ResumeDateFormProps> = ({
  step,
  initialValues,
  onChange,
  entityReference,
  entityStepReference,
  stepDataId,
  textAreaLabel,
  fileLabel,
  datePickerLabel,
  withTodos,
}) => {
  const [formData, setFormData] = useState({
    ...initialValues,
    resume: initialValues?.resume ? initialValues.resume : "",
    file:
      typeof initialValues?.file === "string" && initialValues.file !== ""
        ? { name: initialValues.file }
        : null,
    dateResume: initialValues.dateResume
      ? parseValueToZonedDateTime(initialValues.dateResume)
      : null,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const datePickerRef = useRef<HTMLInputElement | null>(null);
  const [_, setParsedDateResume] = useState<ZonedDateTime | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (formData[name] !== value) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        onChange(step?.id || 0, name, value);
      }
    },
    [formData, onChange, step?.id],
  );

  // Handle file change
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;

      if (files && files.length > 0) {
        const file = files[0];

        // Only update state if the file has changed
        if (formData[name] !== file) {
          setFormData((prev) => ({ ...prev, [name]: file }));
          onChange(step?.id || 0, name, file);
        }
      }
    },
    [formData, onChange, step?.id],
  );

  const handleDeleteFile = (fileName: string) => {
    if (formData && formData.file.name === fileName) {
      // @ts-ignore
      setFormData((prev) => ({
        ...prev,
        file: null,
      }));
    }
  };

  const handlePickerChange = (value: any) => {
    const textField = datePickerRef.current;

    const target = {
      name: textField.name,
      value,
    };

    const parsedDate =
      value instanceof ZonedDateTime ? value : convertToZonedDateTime(value);

    if (parsedDate) {
      setFormData((prev) => ({ ...prev, [target.name]: parsedDate }));
      onChange(step.id, target.name, parsedDate);
    } else {
      setFormData((prev) => ({ ...prev, [target.name]: value }));
      onChange(step.id, target.name, target.value);
    }
  };

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        dateResume: parseValueToZonedDateTime(initialValues.dateResume),
        file:
          typeof initialValues.file === "string" && initialValues.file !== ""
            ? { name: initialValues.file }
            : initialValues.file,
      }));

      console.log(formData);
    }
  }, [initialValues]);

  useEffect(() => {
    if (initialValues?.dateResume) {
      const parsedDate = parseValueToZonedDateTime(initialValues.dateResume);

      setParsedDateResume(parsedDate);
    }
  }, [initialValues]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className={`col-span-12 custom-file-container`}>
        <label className="file-label self-start text-foreground" htmlFor="file">
          Documento
        </label>

        <div
          className="custom-file-wrapper !bg-white"
          role="presentation"
          onClick={handleClick}
        >
          <span className="custom-file-text">
            {(() => {
              if (typeof formData.file === "object" && formData.file !== null) {
                return formData.file.name;
              } else if (
                typeof formData.file === "string" &&
                formData.file !== ""
              ) {
                return formData.file;
              } else {
                return "Seleccionar archivo";
              }
            })()}
          </span>
          <button className="custom-file-button" type="button">
            Examinar
          </button>
        </div>

        <input
          ref={inputRef}
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
          name="file"
          style={{ display: "none" }}
          type="file"
          onChange={handleFileChange}
        />

        {formData.file?.name && (
          <div className="flex flex-row gap-4">
            <button
              className="text-xs mt-2 text-cerulean-950 cursor-pointer w-fit underline"
              type="button"
              onClick={() => handleDownloadDocument(formData.file?.name)}
            >
              Visualizar archivo
            </button>

            <button
              className="text-xs mt-2 text-cerulean-950 cursor-pointer w-fit underline"
              type="button"
              onClick={() => handleDeleteFile(formData.file?.name)}
            >
              Eliminar archivo
            </button>
          </div>
        )}
      </div>

      <DatePicker
        className="col-span-12 nextui-textarea-nomodal"
        inputRef={datePickerRef}
        label={datePickerLabel}
        name="dateResume"
        value={formData.dateResume as any}
        onChange={handlePickerChange}
      />

      {withTodos && (
        <TodoStepDataGrid
          entityReference={entityReference}
          entityStepReference={entityStepReference}
          stepDataId={stepDataId}
          stepId={step.id}
        />
      )}

      {!withTodos && (
        <Textarea
          className="col-span-12 nextui-textarea-nomodal"
          label={textAreaLabel ?? "Comentarios"}
          name="resume"
          value={formData.resume || ""}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default ResumeDateForm;
