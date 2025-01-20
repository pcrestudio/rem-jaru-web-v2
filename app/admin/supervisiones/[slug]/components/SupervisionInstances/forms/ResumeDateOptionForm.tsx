import React, { FC, useEffect, useRef, useState } from "react";
import { Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/react";

import { handleDownloadDocument } from "@/app/helpers/downloadDocumentHelper";
import { GenericFormProps } from "@/app/admin/supervisiones/[slug]/components/SupervisionInstances/forms/GenericForm";
import useStore from "@/lib/store";

export interface ResumeDateFormProps extends GenericFormProps {
  textAreaLabel?: string;
  fileLabel?: string;
  radioGroupLabel?: string;
}

const ResumeDateOptionForm: FC<ResumeDateFormProps> = ({
  step,
  initialValues,
  onChange,
  entityReference,
  entityStepReference,
  stepDataId,
  textAreaLabel,
  fileLabel,
  radioGroupLabel,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const datePickerRef = useRef<HTMLInputElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
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

  const handleChoiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, ["choice"]: value }));
    onChange(step.id, "choice", value);
    updateStepData(step.id, { ["choice"]: value });
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
          {fileLabel || "Adjunto"}
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

      <RadioGroup
        className="col-span-12"
        classNames={{
          label: "file-label self-start text-foreground",
        }}
        label={radioGroupLabel || "Grupo"}
        orientation="horizontal"
        value={formData.choice || selected}
        onValueChange={handleChoiceChange}
      >
        <Radio name="choice" value="win">
          Ganó
        </Radio>
        <Radio name="choice" value="lose">
          Perdió
        </Radio>
      </RadioGroup>

      <Textarea
        className="col-span-12 nextui-textarea-nomodal"
        label={textAreaLabel ?? "Comentarios"}
        name="resume"
        value={formData.resume || ""}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ResumeDateOptionForm;
