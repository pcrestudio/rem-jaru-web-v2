import Stepper from "@mui/material/Stepper";
import { FC, useEffect, useState } from "react";
import { Step, StepContent, StepLabel } from "@mui/material";
import useSWR from "swr";

import { GetInstanceDto } from "@/app/dto/instance/get-instance.dto";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import InstanceForm from "@/app/admin/procesos-judiciales/components/InstanceForm";
import useStore from "@/lib/store";
import {
  QontoConnector,
  QontoStepIcon,
} from "@/components/shared/dynamic-stepper/DynamicStepperConnector/DynamicStepperConnector";

interface DynamicStepperProps {
  entityReference?: string;
  className?: string;
}

const DynamicStepper: FC<DynamicStepperProps> = ({
  entityReference,
  className,
}) => {
  const { data } = useSWR<GetInstanceDto[]>(
    `${environment.baseUrl}/instance?entityReference=${entityReference}`,
    fetcher,
  );

  const [activeStep, setActiveStep] = useState(0);
  const [activeInnerSteps, setActiveInnerSteps] = useState<number[]>(
    data?.map(() => 0) || [],
  );

  const { updateStepData, updateStepDataArray } = useStore();

  const handleStepDataChange = (
    stepId: number,
    fieldName: string,
    value: string,
  ) => {
    const newData = { [fieldName]: value, stepId, entityReference };

    updateStepData(stepId, newData);
    updateStepDataArray(stepId, newData);
  };

  const getInitialValuesForStep = (stepId: number) => {
    const storeState = useStore.getState();

    return storeState.stepData[stepId] || {};
  };

  const handleNextInstance = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  const handleNextInstanceStep = (outerIndex: number, innerIndex: number) => {
    setActiveInnerSteps((prev) => {
      const newInnerSteps = [...prev];

      newInnerSteps[outerIndex] = innerIndex;

      return newInnerSteps;
    });
  };

  useEffect(() => {
    if (data) {
      data.forEach(({ steps }) => {
        steps.forEach((step) => {
          const initialValues = step.stepData?.[0] || {};

          updateStepData(step.id, {
            ...initialValues,
            stepId: step.id,
            entityReference,
          });

          updateStepDataArray(step.id, {
            ...initialValues,
            stepId: step.id,
            entityReference,
          });
        });
      });
    }
  }, [data, entityReference, updateStepData]);

  return (
    <div className={`dynamic-stepper ${className || ""}`}>
      {/* Stepper Horizontal */}
      <div className="horizontal-stepper">
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {data &&
            data.map(({ id, name }, outerIndex) => (
              <Step key={id} onClick={() => handleNextInstance(outerIndex)}>
                <StepLabel StepIconComponent={QontoStepIcon}>{name}</StepLabel>
              </Step>
            ))}
        </Stepper>
      </div>

      <div className="vertical-stepper-container">
        {data && data[activeStep] && (
          <Stepper
            activeStep={activeInnerSteps[activeStep] || 0}
            className="vertical-stepper mt-4"
            orientation="vertical"
          >
            {data[activeStep].steps.map((step, innerIndex) => (
              <Step
                key={`${step.id}-step`}
                onClick={() => handleNextInstanceStep(activeStep, innerIndex)}
              >
                <StepLabel StepIconComponent={QontoStepIcon}>
                  {step.name}
                </StepLabel>
                <StepContent
                  sx={{
                    paddingTop: 4,
                  }}
                >
                  <InstanceForm
                    entityReference={step.stepData[0]?.entityId}
                    initialValues={
                      step.stepData.length > 0
                        ? step.stepData[0]
                        : getInitialValuesForStep(step.id)
                    }
                    step={step}
                    stepDataId={step.stepData[0]?.id}
                    onChange={handleStepDataChange}
                  />
                </StepContent>
              </Step>
            ))}
          </Stepper>
        )}
      </div>
    </div>
  );
};

export default DynamicStepper;
