import React, { FC, useEffect, useRef, useState } from "react";

import { GetStepDto } from "@/app/dto/instance/get-instance.dto";
import TodoStepDataGrid from "@/app/admin/todos/components/todo-step-datagrid/TodoStepDataGrid";
import { handleDownloadDocument } from "@/app/helpers/downloadDocumentHelper";
import useStore from "@/lib/store";
import { DatePicker } from "@nextui-org/react";
import { ZonedDateTime } from "@internationalized/date";
import { convertToZonedDateTime } from "@/utils/format_date";
import parseValueToZonedDateTime from "@/config/parse_date_value.config";
import { Textarea } from "@nextui-org/input";

export interface EtapaSupervisionFormProps {
  onChange: (stepId: number, fieldName: string, value: any) => void;
  step?: GetStepDto;
  entityReference?: string;
  entityStepReference?: string;
  initialValues?: Record<string, any>;
  stepDataId?: number;
}

const EtapaSupervisionForm: FC<EtapaSupervisionFormProps> = ({
  step,
  initialValues,
  onChange,
  stepDataId,
  entityReference,
  entityStepReference,
}) => {
  const [formData, setFormData] = useState({
    ...initialValues,
    resume: initialValues.resume,
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
  const [parsedDateResume, setParsedDateResume] =
    useState<ZonedDateTime | null>(null);
  const { updateStepDataArray } = useStore();
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
      updateStepDataArray(step.id, { [target.name]: parsedDate });
    } else {
      setFormData((prev) => ({ ...prev, [target.name]: value }));
      onChange(step.id, target.name, target.value);
      updateStepDataArray(step.id, { [target.name]: target.value });
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
          Acta de supervisión
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
              } else if (typeof formData.file === "string") {
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
          <button
            className="text-xs mt-2 text-cerulean-950 cursor-pointer w-fit underline"
            onClick={() => handleDownloadDocument(formData.file?.name)}
          >
            Visualizar archivo
          </button>
        )}
      </div>

      <DatePicker
        className="col-span-12 nextui-textarea-nomodal"
        inputRef={datePickerRef}
        label="Fecha de visita"
        name="dateResume"
        value={formData.dateResume}
        onChange={handlePickerChange}
      />

      <Textarea
        className="col-span-12 nextui-textarea-nomodal"
        label="Medidas preventivas (Detallar)"
        name="resume"
        value={formData.resume || ""}
        onChange={handleInputChange}
      />

      <TodoStepDataGrid
        entityReference={entityReference}
        entityStepReference={entityStepReference}
        stepDataId={stepDataId}
        stepId={step.id}
      />
    </div>
  );
};

export default EtapaSupervisionForm;
