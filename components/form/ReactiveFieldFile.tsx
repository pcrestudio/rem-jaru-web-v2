import React, { ChangeEvent, FC, useRef, useState } from "react";
import { Controller } from "react-hook-form";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { handleDownloadDocument } from "@/app/helpers/downloadDocumentHelper";

export interface ReactiveFieldFileProps extends ReactiveFieldProps {}

const ReactiveFieldFile: FC<ReactiveFieldFileProps> = ({
  name,
  className,
  errors,
  touched,
  label,
  control,
  defaultValue,
  isRequired,
}) => {
  const errorMessage = touched && errors[name] ? errors[name].message : "";
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: any,
  ) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      setSelectedFile(file.name);
      onChange(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => (
        <div className={`${className} custom-file-container`}>
          <label
            className="file-label self-start text-foreground"
            htmlFor={name}
          >
            {label} {isRequired && <span className="required">*</span>}
          </label>

          <div
            className="custom-file-wrapper !bg-white"
            role="presentation"
            onClick={handleClick}
          >
            <span className="custom-file-text">
              {selectedFile || defaultValue || "Seleccionar archivo"}
            </span>
            <button className="custom-file-button" type="button">
              Examinar
            </button>
          </div>

          <input
            ref={inputRef}
            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
            name={name}
            style={{ display: "none" }}
            type="file"
            onChange={(e) => handleFileChange(e, field.onChange)}
          />

          {defaultValue && (
            <button
              className="text-xs mt-2 text-cerulean-950 cursor-pointer w-fit underline"
              onClick={() => handleDownloadDocument(defaultValue)}
            >
              Visualizar archivo
            </button>
          )}
        </div>
      )}
    />
  );
};

export default ReactiveFieldFile;
