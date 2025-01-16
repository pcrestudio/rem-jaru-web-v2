import React, { FC, useEffect, useRef, useState } from "react";

import { GetStepDto } from "@/app/dto/instance/get-instance.dto";
import TodoStepDataGrid from "@/app/admin/todos/components/todo-step-datagrid/TodoStepDataGrid";
import { handleDownloadDocument } from "@/app/helpers/downloadDocumentHelper";
import useStore from "@/lib/store";

export interface GenericFormProps {
  onChange: (stepId: number, fieldName: string, value: any) => void;
  step?: GetStepDto;
  initialValues?: Record<string, any>;
  entityReference?: string;
  entityStepReference?: string;
  stepDataId?: number;
}

const GenericForm: FC<GenericFormProps> = ({
  step,
  initialValues,
  onChange,
  entityReference,
  entityStepReference,
  stepDataId,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { updateStepData } = useStore();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    onChange(step.id, name, value);
    updateStepData(step.id, { [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      setFormData((prev) => ({ ...prev, [name]: file }));
      onChange(step?.id || 0, name, file);
      updateStepData(step.id, { [name]: file });
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
      <div className={`col-span-12 custom-file-container`}>
        <label className="file-label self-start text-foreground" htmlFor="file">
          Adjunto
        </label>

        <div
          className="custom-file-wrapper !bg-white"
          role="presentation"
          onClick={handleClick}
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
          <button
            className="text-xs mt-2 text-cerulean-950 cursor-pointer w-fit underline"
            onClick={() => handleDownloadDocument(formData.file?.name)}
          >
            Visualizar archivo
          </button>
        )}
      </div>

      <TodoStepDataGrid
        entityReference={entityReference}
        entityStepReference={entityStepReference}
        stepDataId={stepDataId}
        stepId={step.id}
      />
    </div>
  );
};

export default GenericForm;
