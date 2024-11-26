import { GetInstanceDto } from "@/app/dto/instance/get-instance.dto";
import Stepper from "@mui/material/Stepper";
import { FC, useState } from "react";
import { Step, StepContent, StepLabel } from "@mui/material";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";

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

  const handleStepClick = (stepIndex: number, isCompleted: boolean) => {
    if (isCompleted) {
      setActiveStep(stepIndex);
    }
  };

  const handleInnerStepClick = (outerIndex: number, innerIndex: number) => {
    setActiveInnerSteps((prev) => {
      const newInnerSteps = [...prev];
      newInnerSteps[outerIndex] = innerIndex;
      return newInnerSteps;
    });
  };

  return (
    <Stepper activeStep={activeStep} alternativeLabel className={className}>
      {data &&
        data.map(({ id, name, steps }, outerIndex) => {
          const allStepsCompleted = steps.every(
            (step) =>
              step.stepData.length > 0 &&
              step.stepData.every((data) => data.completed),
          );

          return (
            <Step
              key={id}
              onClick={() => handleStepClick(outerIndex, allStepsCompleted)}
              completed={allStepsCompleted}
            >
              <StepLabel>
                {name}
                {activeStep === outerIndex && (
                  <Stepper
                    className="mt-4"
                    orientation="vertical"
                    activeStep={activeInnerSteps[outerIndex] || 0}
                  >
                    {steps.map((step, innerIndex) => {
                      const stepCompleted =
                        step.stepData.length > 0 &&
                        step.stepData.every((data) => data.completed);

                      return (
                        <Step
                          key={`${step.id}-step`}
                          onClick={() =>
                            handleInnerStepClick(outerIndex, innerIndex)
                          }
                          completed={stepCompleted}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <StepLabel>{step.name}</StepLabel>
                          <StepContent>
                            <p>hola mundo</p>
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

/*
 * <StepContent className="border border-red-700"></StepContent>
 *
 * */
