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
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          {...field}
          name={name}
          className="col-span-12"
          isSelected={isSelected}
          onValueChange={onValueChange}
        >
          {label}
        </Switch>
      )}
    ></Controller>
  );
};

export default ReactiveSwitch;
