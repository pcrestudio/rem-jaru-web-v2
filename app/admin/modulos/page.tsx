"use client";

import useSWR from "swr";
import { usePathname } from "next/navigation";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import ModulesCard from "@/components/admin/modules/ModulesCard";

export default function Modulos() {
  const pathname: string = usePathname();
  const { data } = useSWR<GetModuleDto[]>(
    `${environment.baseUrl}/modules`,
    fetcher,
  );

  return (
    <div className="page">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-cerulean-950">
          ¿Qué te gustaría gestionar hoy?
        </h1>
        <p className="text-base text-slate-700">
          Explora todas las herramientas disponibles y agiliza tus tareas
          diarias.
        </p>
      </div>
      {data && (
        <div className="grid grid-cols-4 gap-8">
          {data.map((module) => (
            <ModulesCard
              key={module.name}
              isSubmodule={false}
              module={module}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
}
