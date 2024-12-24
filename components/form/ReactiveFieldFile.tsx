import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import React, { ChangeEvent, FC, useRef, useState } from "react";
import { Controller } from "react-hook-form";
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
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className={`${className} custom-file-container`}>
          <label
            htmlFor={name}
            className="file-label self-start text-foreground"
          >
            {label} {isRequired && <span className="required">*</span>}
          </label>

          <div
            className="custom-file-wrapper !bg-white"
            onClick={handleClick}
            role="presentation"
          >
            <span className="custom-file-text">
              {selectedFile || defaultValue || "Seleccionar archivo"}
            </span>
            <button type="button" className="custom-file-button">
              Examinar
            </button>
          </div>

          <input
            type="file"
            name={name}
            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
            ref={inputRef}
            onChange={(e) => handleFileChange(e, field.onChange)}
            style={{ display: "none" }}
          />

          {defaultValue && (
            <p
              className="text-xs mt-2 text-cerulean-950 cursor-pointer w-fit underline"
              onClick={() => handleDownloadDocument(defaultValue)}
            >
              Visualizar archivo
            </p>
          )}
        </div>
      )}
    />
  );
};

export default ReactiveFieldFile;
