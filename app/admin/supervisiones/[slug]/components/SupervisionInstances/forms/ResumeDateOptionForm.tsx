import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/react";

import { handleDownloadDocument } from "@/app/helpers/downloadDocumentHelper";
import { GenericFormProps } from "@/app/admin/supervisiones/[slug]/components/SupervisionInstances/forms/GenericForm";

export interface ResumeDateFormProps extends GenericFormProps {
  textAreaLabel?: string;
  fileLabel?: string;
  radioGroupLabel?: string;
}

const ResumeDateOptionForm: FC<ResumeDateFormProps> = ({
  step,
  initialValues,
  onChange,
  textAreaLabel,
  fileLabel,
  radioGroupLabel,
}) => {
  const [formData, setFormData] = useState(initialValues || {});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const datePickerRef = useRef<HTMLInputElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

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

  const handleChoiceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      ["choice"]: value,
    }));
    onChange(step.id, "choice", value);
  };

  const handleDeleteFile = (fileName: string) => {
    if (formData && formData.file.name === fileName) {
      // @ts-ignore
      setFormData((prev) => ({
        ...prev,
        file: null,
      }));
    }
  };

  useEffect(() => {
    console.log(initialValues);

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
