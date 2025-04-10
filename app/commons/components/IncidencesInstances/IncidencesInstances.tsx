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
import { ModelType } from "@/config/model-type.config";
import SupervisionInstances from "@/app/admin/supervisiones/[slug]/components/SupervisionInstances/SupervisionInstances";
import { InstanceConfig } from "@/config/instance.config";

interface IncidenceInstancesProps {
  entityReference?: string;
  incidenceId?: number;
  modelType?: string;
  className?: string;
}

const IncidenceInstances: FC<IncidenceInstancesProps> = ({
  entityReference,
  incidenceId,
  modelType = ModelType.JudicialProcess,
  className,
}) => {
  const { data } = useSWR<GetInstanceDto[]>(
    `${environment.baseUrl}/incident/instances?entityReference=${entityReference}&incidenceId=${incidenceId}`,
    fetcher,
  );

  const [activeStep, setActiveStep] = useState(0);
  const [instanceName, setInstanceName] = useState<string | null>(null);
  const [activeInnerSteps, setActiveInnerSteps] = useState<number[]>(
    data?.map(() => 0) || [],
  );

  const { updateStepData, updateStepDataArray, clearStepData } = useStore();

  const handleStepDataChange = (
    stepId: number,
    fieldName: string,
    value: string,
  ) => {
    const storeState = useStore.getState();
    const existingData =
      storeState.stepDataArray.find((item) => item.stepId === stepId) || {};

    const newData = {
      ...existingData,
      [fieldName]: value,
      stepId,
      incidenceId: incidenceId.toString(),
      entityReference,
    };

    updateStepData(stepId, newData);
    updateStepDataArray(stepId, newData);
  };

  const getInitialValuesForStep = (stepId: number) => {
    const storeState = useStore.getState();

    return storeState.stepData[stepId] || {};
  };

  const handleNextInstance = (stepIndex: number, name: string) => {
    setActiveStep(stepIndex);
    setInstanceName(name);
  };

  const handleNextInstanceStep = (outerIndex: number, innerIndex: number) => {
    setActiveInnerSteps((prev) => {
      const newInnerSteps = [...prev];

      newInnerSteps[outerIndex] = innerIndex;

      return newInnerSteps;
    });
  };

  useEffect(() => {
    clearStepData();

    if (data) {
      data.forEach(({ steps }) => {
        steps.forEach((step) => {
          const initialValues = step.stepData?.[0] || {};

          updateStepDataArray(
            step.id,
            {
              ...initialValues,
              incidenceId: incidenceId.toString(),
              stepId: step.id,
              entityReference,
            },
            initialValues["entityId"],
          );
        });
      });
    }
  }, [data, entityReference, updateStepData, instanceName, incidenceId]);

  const index = data?.findIndex(
    (instance) => instance.name === InstanceConfig.INSPECTIVA,
  );

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
              <Step
                key={id}
                onClick={() => handleNextInstance(outerIndex, name)}
              >
                <StepLabel StepIconComponent={QontoStepIcon}>{name}</StepLabel>
              </Step>
            ))}
        </Stepper>
      </div>

      <div className="vertical-stepper-container">
        {data && data[activeStep] && (
          <>
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
                    {modelType !== ModelType.Supervision ? (
                      <InstanceForm
                        entityReference={entityReference}
                        entityStepReference={step.stepData[0]?.entityId}
                        initialValues={
                          step.stepData.length > 0
                            ? step.stepData[0]
                            : getInitialValuesForStep(step.id)
                        }
                        step={step}
                        stepDataId={step.stepData[0]?.id}
                        onChange={handleStepDataChange}
                      />
                    ) : (
                      <SupervisionInstances
                        entityReference={entityReference}
                        entityStepReference={step.stepData[0]?.entityId}
                        initialValues={
                          step.stepData.length > 0
                            ? step.stepData[0]
                            : getInitialValuesForStep(step.id)
                        }
                        instanceName={
                          index === 0 ? InstanceConfig.INSPECTIVA : instanceName
                        }
                        step={step}
                        stepDataId={step.stepData[0]?.id}
                        stepName={step.name}
                        onChange={handleStepDataChange}
                      />
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </>
        )}
      </div>
    </div>
  );
};

export default IncidenceInstances;
