import React, { FC, useEffect, useRef, useState } from "react";
import { GetStepDto } from "@/app/dto/instance/get-instance.dto";
import { Textarea } from "@nextui-org/input";
import TodoStepDataGrid from "@/app/admin/todos/components/todo-step-datagrid/TodoStepDataGrid";

interface InstanceFormProps {
  onChange: (stepId: number, fieldName: string, value: any) => void;
  step?: GetStepDto;
  initialValues?: Record<string, any>;
  entityReference?: string;
  stepDataId?: number;
}

const InstanceForm: FC<InstanceFormProps> = ({
  step,
  initialValues,
  onChange,
  entityReference,
  stepDataId,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    onChange(step.id, name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      onChange(step?.id || 0, name, file);
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
          Documento
        </label>

        <div
          className="custom-file-wrapper !bg-white"
          onClick={handleClick}
          role="presentation"
        >
          <span className="custom-file-text">
            {formData.file?.name || formData.file || "Seleccionar archivo"}
          </span>
          <button type="button" className="custom-file-button">
            Examinar
          </button>
        </div>

        <input
          type="file"
          name="file"
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <TodoStepDataGrid
        stepDataId={stepDataId}
        stepId={step.id}
        entityReference={entityReference}
      />

      <Textarea
        onChange={handleInputChange}
        label="Comentarios"
        name="comments"
        className="col-span-12 nextui-textarea-nomodal"
        value={formData.comments || ""}
      />
    </div>
  );
};

export default InstanceForm;
