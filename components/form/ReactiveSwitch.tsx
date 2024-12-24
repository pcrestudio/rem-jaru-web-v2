import { Switch } from "@nextui-org/switch";
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
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch
          {...field}
          className="col-span-12"
          isSelected={isSelected}
          name={name}
          onValueChange={onValueChange}
        >
          {label}
        </Switch>
      )}
    />
  );
};

export default ReactiveSwitch;
