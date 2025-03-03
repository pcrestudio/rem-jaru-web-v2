"use client";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";

import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { CreateSectionAttributeDto } from "@/app/dto/attribute-values/create-section-attribute.dto";
import { createSettingSection } from "@/app/api/attribute-values/atrribute-values";
import { CreateSettingSectionDto } from "@/app/dto/attribute-values/create-setting-section.dto";
import useStore from "@/lib/store";
import { GetGroupedStepDto } from "@/app/dto/instance/get-instance.dto";
import StepSection from "@/app/admin/ajustes/instancias/components/InstanceAccordion/InstanceAccordion";
import InstanceSettingForm from "@/app/admin/ajustes/instancias/components/forms/InstanceSettingForm/InstanceSettingForm";
import { canUse, CanUsePermission } from "@/utils/can_use_permission";
import { UpsertInstanceDto } from "@/app/dto/instance/upsert-instance.dto";
import { upsertInstance } from "@/app/api/instances/instances";

export default function Instancias() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSWR<GetGroupedStepDto>(
    `${environment.baseUrl}/instance/settings`,
    fetcher,
  );
  const groupedData = data ? Object.entries(data) : [];
  const handleSubmit = async (payload: UpsertInstanceDto) => {
    const { data } = await upsertInstance(payload);

    if (data) {
      toast.success("Instancia creada con éxito");
      setIsOpen(false);
    } else {
      toast.error("No pudimos crear la instancia.");
    }
  };
  const { user } = useStore();

  return (
    <>
      <InstanceSettingForm
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        title={"Nueva instancia"}
        onCloseChange={() => setIsOpen(false)}
      />

      <div className="page-settings !px-6">
        <BreadcrumbsPath pathname={pathname} />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-cerulean-950">
              Diseña y gestiona tus instancias
            </h1>
            <p className="text-base text-slate-700 max-w-4xl">
              Configura y organiza tus instancias con los pasos necesarios para
              que logres tus objetivos esperados.
            </p>
          </div>

          <Button
            className="standard-btn w-auto text-white"
            endContent={<AiOutlinePlus />}
            isDisabled={!canUse(user.role, CanUsePermission.addInstances)}
            onPress={() => setIsOpen(true)}
          >
            Agregar instancia
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {groupedData.length > 0 &&
            groupedData.map(([name, instances]) => (
              <Accordion
                key={name}
                className="master-global-accordion"
                itemClasses={{
                  base: "-p-0",
                  title: "master-title text-cerulean-950 font-bold text-lg",
                  content: "master-accordion",
                  trigger: "border-b-red-500",
                }}
                selectionMode="multiple"
                variant="splitted"
              >
                <AccordionItem title={name}>
                  <StepSection instances={instances} />
                </AccordionItem>
              </Accordion>
            ))}
        </div>
      </div>
    </>
  );
}
