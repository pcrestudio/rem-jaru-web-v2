import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { Input, Textarea } from "@heroui/input";

import { GetStepDto } from "@/app/dto/instance/get-instance.dto";
import TodoStepDataGrid from "@/app/admin/todos/components/todo-step-datagrid/TodoStepDataGrid";
import { handleDownloadDocument } from "@/app/helpers/downloadDocumentHelper";

interface InstanceFormProps {
  onChange: (stepId: number, fieldName: string, value: any) => void;
  step?: GetStepDto;
  initialValues?: Record<string, any>;
  entityReference?: string;
  entityStepReference?: string;
  stepDataId?: number;
}

const InstanceForm: FC<InstanceFormProps> = ({
  step,
  initialValues,
  onChange,
  entityReference,
  entityStepReference,
  stepDataId,
}) => {
  const [formData, setFormData] = useState(initialValues || {});
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle input change with debounce (optional)
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      // Only update state if the value has changed
      if (formData[name] !== value) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        onChange(step?.id || 0, name, value);
      }
    },
    [formData, onChange, step?.id],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;

      if (files && files.length > 0) {
        const file = files[0];

        // Solo actualizar el estado si el archivo ha cambiado
        if (formData[name]?.name !== file.name) {
          setFormData((prev) => ({ ...prev, [name]: file }));
          onChange(step?.id || 0, name, file);
        }
      }
    },
    [formData, onChange, step?.id],
  );

  const handleDeleteFile = (fileName: string) => {
    if (formData && formData.file.name === fileName) {
      setFormData((prev) => ({
        ...prev,
        file: "",
      }));
    }
  };

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        file:
          typeof initialValues.file === "string" && initialValues.file !== ""
            ? { name: initialValues.file }
            : initialValues.file,
      }));
    }
  }, [initialValues]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <Input
        className="col-span-12 nextui-input-nomodal"
        label="Código de referencia"
        name="title"
        value={formData.title || ""}
        onChange={handleInputChange}
      />

      <div className={`col-span-12 custom-file-container`}>
        <label className="file-label self-start text-foreground" htmlFor="file">
          Documento
        </label>

        <div
          className="custom-file-wrapper !bg-white"
          role="presentation"
          onClick={() => inputRef.current?.click()}
        >
          <span className="custom-file-text">
            {formData.file?.name || formData.file || "Seleccionar archivo"}
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

      <TodoStepDataGrid
        entityReference={entityReference}
        entityStepReference={entityStepReference}
        stepDataId={stepDataId}
        stepId={step?.id || 0}
      />

      <Textarea
        className="col-span-12 nextui-textarea-nomodal"
        label="Comentarios"
        name="comments"
        value={formData.comments || ""}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default React.memo(InstanceForm);
