"use client";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import useSWR from "swr";
import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import ModulesCard from "@/components/admin/modules/ModulesCard";
import { usePathname } from "next/navigation";

export default function Modulos() {
  const pathname: string = usePathname();
  const { data, error, isLoading } = useSWR<GetModuleDto[]>(
    `${environment.baseUrl}/modules`,
    fetcher,
  );

  return (
    <div className="flex flex-col gap-10">
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
        <div className="grid grid-cols-3 gap-8">
          {data.map((module) => (
            <ModulesCard
              key={module.name}
              module={module}
              pathname={pathname}
              isSubmodule={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
