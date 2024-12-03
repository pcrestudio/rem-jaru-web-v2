import { GetInstanceDto } from "@/app/dto/instance/get-instance.dto";
import Stepper from "@mui/material/Stepper";
import { FC, useEffect, useState } from "react";
import { Step, StepContent, StepLabel } from "@mui/material";
import useSWR from "swr";
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
      data.forEach(({ id, steps }) => {
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
    <Stepper
      alternativeLabel
      nonLinear
      activeStep={activeStep}
      className={className}
      connector={<QontoConnector />}
    >
      {data &&
        data.map(({ id, name, steps }, outerIndex) => {
          return (
            <Step key={id} onClick={() => handleNextInstance(outerIndex)}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                {name}
                {activeStep === outerIndex && (
                  <Stepper
                    className="mt-4"
                    orientation="vertical"
                    activeStep={activeInnerSteps[outerIndex] || 0}
                  >
                    {steps.map((step, innerIndex) => {
                      return (
                        <Step
                          key={`${step.id}-step`}
                          onClick={() =>
                            handleNextInstanceStep(outerIndex, innerIndex)
                          }
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <StepLabel StepIconComponent={QontoStepIcon}>
                            {step.name}
                          </StepLabel>
                          <StepContent>
                            <InstanceForm
                              step={step}
                              onChange={handleStepDataChange}
                              initialValues={
                                step.stepData.length > 0
                                  ? step.stepData[0]
                                  : getInitialValuesForStep(step?.id)
                              }
                            />
                          </StepContent>
                        </Step>
                      );
                    })}
                  </Stepper>
                )}
              </StepLabel>
            </Step>
          );
        })}
    </Stepper>
  );
};

export default DynamicStepper;
