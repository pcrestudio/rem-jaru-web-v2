import { Checkbox } from "@heroui/react";
import { Controller } from "react-hook-form";
import { FC } from "react";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";

interface ReactiveCheckboxProps extends ReactiveFieldProps {
  isSelected?: boolean;
  onValueChange?: (value: boolean) => void;
}

const ReactiveCheckbox: FC<ReactiveCheckboxProps> = ({
  control,
  isSelected,
  onValueChange,
  name,
  className,
  label,
  disabled,
}) => {
  return (
    <Controller
      control={control}
      defaultValue={isSelected || false}
      name={name}
      render={({ field }) => (
        <Checkbox
          {...field}
          className={className}
          isDisabled={disabled}
          isSelected={field.value}
          name={name}
          onValueChange={(value) => {
            field.onChange(value);
            if (onValueChange) {
              onValueChange(value);
            }
          }}
        >
          {" "}
          <span className="text-small">{label}</span>{" "}
        </Checkbox>
      )}
    />
  );
};

export default ReactiveCheckbox;
