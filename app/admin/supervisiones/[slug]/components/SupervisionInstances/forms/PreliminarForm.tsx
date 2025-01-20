import React, { FC, useEffect, useRef, useState } from "react";
import { DatePicker } from "@heroui/react";
import { ZonedDateTime } from "@internationalized/date";
import { Textarea } from "@heroui/input";

import { GetStepDto } from "@/app/dto/instance/get-instance.dto";
import TodoStepDataGrid from "@/app/admin/todos/components/todo-step-datagrid/TodoStepDataGrid";
import { handleDownloadDocument } from "@/app/helpers/downloadDocumentHelper";
import useStore from "@/lib/store";
import { convertToZonedDateTime } from "@/utils/format_date";
import parseValueToZonedDateTime from "@/config/parse_date_value.config";

export interface PreeliminarFormProps {
  onChange: (stepId: number, fieldName: string, value: any) => void;
  step?: GetStepDto;
  entityReference?: string;
  entityStepReference?: string;
  initialValues?: Record<string, any>;
  stepDataId?: number;
}

const PreliminarForm: FC<PreeliminarFormProps> = ({
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
    fileTwo:
      typeof initialValues?.fileTwo === "string" && initialValues.fileTwo !== ""
        ? { name: initialValues.fileTwo }
        : null,
    fileThree:
      typeof initialValues?.fileThree === "string" &&
      initialValues.fileThree !== ""
        ? { name: initialValues.fileThree }
        : null,
    dateResume: initialValues.dateResume
      ? parseValueToZonedDateTime(initialValues.dateResume)
      : null,
  });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const fileTwoRef = useRef<HTMLInputElement | null>(null);
  const fileThreeRef = useRef<HTMLInputElement | null>(null);
  const datePickerRef = useRef<HTMLInputElement | null>(null);
  const [parsedDateResume, setParsedDateResume] =
    useState<ZonedDateTime | null>(null);
  const { updateStepDataArray } = useStore();
  const { updateStepData } = useStore();

  const handleClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
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
        fileTwo:
          typeof initialValues.fileTwo === "string" &&
          initialValues.fileTwo !== ""
            ? { name: initialValues.fileTwo }
            : initialValues.fileTwo,
        fileThree:
          typeof initialValues.fileThree === "string" &&
          initialValues.fileThree !== ""
            ? { name: initialValues.fileThree }
            : initialValues.fileThree,
      }));
    }
  }, [initialValues]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <DatePicker
        className="col-span-12 nextui-textarea-nomodal"
        inputRef={datePickerRef}
        label="Fecha de visita"
        name="dateResume"
        value={formData.dateResume}
        onChange={handlePickerChange}
      />

      <div className={`col-span-12 custom-file-container`}>
        <label className="file-label self-start text-foreground" htmlFor="file">
          Acta de supervisión
        </label>

        <div
          className="custom-file-wrapper !bg-white"
          role="presentation"
          onClick={() => handleClick(fileRef)}
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
          ref={fileRef}
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

      <div className={`col-span-12 custom-file-container`}>
        <label
          className="file-label self-start text-foreground"
          htmlFor="fileTwo"
        >
          Requerimiento de información
        </label>

        <div
          className="custom-file-wrapper !bg-white"
          role="presentation"
          onClick={() => handleClick(fileTwoRef)}
        >
          <span className="custom-file-text">
            {(() => {
              if (
                typeof formData.fileTwo === "object" &&
                formData.fileTwo !== null
              ) {
                return formData.fileTwo.name;
              } else if (typeof formData.fileTwo === "string") {
                return formData.fileTwo;
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
          ref={fileTwoRef}
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
          name="fileTwo"
          style={{ display: "none" }}
          type="file"
          onChange={handleFileChange}
        />

        {formData.fileTwo?.name && (
          <button
            className="text-xs mt-2 text-cerulean-950 cursor-pointer w-fit underline"
            onClick={() => handleDownloadDocument(formData.fileTwo?.name)}
          >
            Visualizar archivo
          </button>
        )}
      </div>

      <div className={`col-span-12 custom-file-container`}>
        <label
          className="file-label self-start text-foreground"
          htmlFor="fileThree"
        >
          Cargo de cumplimiento de requerimiento
        </label>

        <div
          className="custom-file-wrapper !bg-white"
          role="presentation"
          onClick={() => handleClick(fileThreeRef)}
        >
          <span className="custom-file-text">
            {(() => {
              if (
                typeof formData.fileThree === "object" &&
                formData.fileThree !== null
              ) {
                return formData.fileThree.name;
              } else if (typeof formData.fileThree === "string") {
                return formData.fileThree;
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
          ref={fileThreeRef}
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
          name="fileThree"
          style={{ display: "none" }}
          type="file"
          onChange={handleFileChange}
        />

        {formData.fileThree?.name && (
          <button
            className="text-xs mt-2 text-cerulean-950 cursor-pointer w-fit underline"
            onClick={() => handleDownloadDocument(formData.fileThree?.name)}
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

      <Textarea
        className="col-span-12 nextui-textarea-nomodal"
        label="Medidas preventivas (Detallar)"
        name="resume"
        value={formData.resume || ""}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PreliminarForm;
