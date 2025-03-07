import { FC } from "react";
import { Accordion, AccordionItem } from "@heroui/react";

import { GetInstanceDto } from "@/app/dto/instance/get-instance.dto";
import InstanceStepDataGrid from "@/app/admin/ajustes/instancias/components/InstanceStepDataGrid/InstanceStepDataGrid";

interface AttributeSectionProps {
  instances?: GetInstanceDto[];
}

const StepSection: FC<AttributeSectionProps> = ({ instances }) => {
  return (
    <>
      {instances &&
        instances.map((instance) => (
          <Accordion
            key={`${instance.name}`}
            className="master-option-global-accordion"
            itemClasses={{
              title:
                "master-option-title text-cerulean-950 font-bold text-base",
              base: "mb-4",
              trigger: "![&>span]:rotate-0",
            }}
            selectionMode="multiple"
            variant="splitted"
          >
            <AccordionItem
              aria-label={`Accordion ${instance.name}`}
              className="border border-slate-200 shadow-none"
              title={`${instance.name}`}
            >
              <InstanceStepDataGrid
                instanceId={instance.id}
                steps={instance.steps}
              />
            </AccordionItem>
          </Accordion>
        ))}
    </>
  );
};

export default StepSection;
