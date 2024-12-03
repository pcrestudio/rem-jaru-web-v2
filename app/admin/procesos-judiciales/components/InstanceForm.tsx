import React, { FC, useEffect, useState } from "react";
import { GetStepDto } from "@/app/dto/instance/get-instance.dto";
import { Input } from "@nextui-org/input";

interface InstanceFormProps {
  onChange: (stepId: number, fieldName: string, value: any) => void;
  step?: GetStepDto;
  initialValues?: Record<string, any>;
}

const InstanceForm: FC<InstanceFormProps> = ({
  step,
  initialValues,
  onChange,
}) => {
  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    onChange(step.id, name, value);
  };

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  return (
    <>
      <Input
        onChange={handleInputChange}
        label="Comentarios"
        name="comments"
        value={formData.comments || ""}
      />
    </>
  );
};

export default InstanceForm;
