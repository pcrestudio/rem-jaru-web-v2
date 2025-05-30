import { Switch } from "@heroui/switch";
import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { ReactiveFieldProps } from "@/components/form/ReactiveField";

interface ReactiveSwitchProps extends ReactiveFieldProps {
  isSelected?: boolean;
  onValueChange?: (value: boolean) => void;
}

const ReactiveSwitch: FC<ReactiveSwitchProps> = ({
  label,
  name,
  control,
  isSelected,
  onValueChange,
  className,
}) => {
  return (
    <Controller
      control={control}
      defaultValue={isSelected || false}
      name={name}
      render={({ field }) => (
        <Switch
          {...field}
          className={className}
          isSelected={field.value}
          name={name}
          onValueChange={(value) => {
            field.onChange(value);
            if (onValueChange) {
              onValueChange(value);
            }
          }}
        >
          <span className="text-sm">{label}</span>
        </Switch>
      )}
    />
  );
};

export default ReactiveSwitch;
