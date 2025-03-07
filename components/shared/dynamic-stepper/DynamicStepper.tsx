import Stepper from "@mui/material/Stepper";
import React, { FC, useEffect, useState } from "react";
import { IconButton, Step, StepContent, StepLabel } from "@mui/material";
import useSWR from "swr";
import { Tabs, Tab } from "@heroui/react";

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
import { UpsertIncidenceDto } from "@/app/dto/incidences/upsert-incidence.dto";
import IncidenceInstances from "@/app/commons/components/IncidencesInstances/IncidencesInstances";
import { AiFillCloseCircle } from "react-icons/ai";

interface DynamicStepperProps {
  entityReference?: string;
  modelType?: string;
  className?: string;
}

const DynamicStepper: FC<DynamicStepperProps> = ({
  entityReference,
  modelType = ModelType.JudicialProcess,
  className,
}) => {
  const { data } = useSWR<GetInstanceDto[]>(
    `${environment.baseUrl}/instance?entityReference=${entityReference}&modelType=${modelType}`,
    fetcher,
  );
  const { data: incidences } = useSWR<UpsertIncidenceDto[]>(
    `${environment.baseUrl}/incident?modelType=${modelType}&entityReference=${entityReference}`,
    fetcher,
  );

  const tabs: UpsertIncidenceDto[] = [
    {
      name: "Expediente principal",
    },
  ];

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
    const newData = { [fieldName]: value, stepId, entityReference };

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
              stepId: step.id,
              entityReference,
            },
            initialValues["entityId"],
          );
        });
      });
    }
  }, [data, entityReference, updateStepData, instanceName]);

  const index = data?.findIndex(
    (instance) => instance.name === InstanceConfig.INSPECTIVA,
  );

  const concatTabs = incidences
    ? incidences.map((incidence) => ({ ...incidence, name: incidence.name }))
    : [];

  const renderTab = (name: string, incidence: UpsertIncidenceDto) => {
    switch (name) {
      case "Expediente principal":
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
                      <StepLabel StepIconComponent={QontoStepIcon}>
                        {name}
                      </StepLabel>
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
                        onClick={() =>
                          handleNextInstanceStep(activeStep, innerIndex)
                        }
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
                                index === 0
                                  ? InstanceConfig.INSPECTIVA
                                  : instanceName
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

      default:
        return (
          <IncidenceInstances
            entityReference={entityReference}
            incidenceId={incidence.id}
            modelType={modelType}
          />
        );
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <Tabs
        aria-label="Dynamic tabs"
        items={incidences ? [...tabs, ...concatTabs] : tabs}
      >
        {(incidence) => (
          <Tab
            key={incidence.name}
            title={
              <div className="flex flex-row gap-4 items-center">
                <span>{incidence.name}</span>

                {incidence.name !== "Expediente principal" && (
                  <IconButton
                    type="button"
                    onClick={() => console.log("click")}
                  >
                    <AiFillCloseCircle className="text-red-300" />
                  </IconButton>
                )}
              </div>
            }
          >
            {renderTab(incidence.name, incidence)}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default DynamicStepper;
