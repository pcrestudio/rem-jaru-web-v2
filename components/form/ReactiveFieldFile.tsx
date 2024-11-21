import { ReactiveFieldProps } from "@/components/form/ReactiveField";
import { ChangeEvent, FC, useRef, useState } from "react";
import { Controller } from "react-hook-form";

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file ? file.name : null);
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
          <label htmlFor={name} className="file-label">
            {label} {isRequired && <span className="required">*</span>}
          </label>

          <div
            className="custom-file-wrapper"
            onClick={handleClick}
            role="presentation"
          >
            <span className="custom-file-text">
              {selectedFile || "Seleccionar archivo"}
            </span>
            <button type="button" className="custom-file-button">
              Examinar
            </button>
          </div>

          <input
            type="file"
            id={name}
            ref={inputRef}
            onChange={(e) => {
              handleFileChange(e);
              field.onChange(e.target.files);
            }}
            style={{ display: "none" }}
          />

          {errors && errors[name] && (
            <p className="file-error-message">{errorMessage}</p>
          )}
        </div>
      )}
    />
  );
};

export default ReactiveFieldFile;
