"use client";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import useSWR from "swr";
import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import ModulesCard from "@/components/admin/modules/ModulesCard";

export default function Modulos() {
  const { data, error, isLoading } = useSWR<GetModuleDto[]>(
    `${environment.baseUrl}/modules`,
    fetcher,
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold text-cerulean-950">
          ¿Qué te gustaría gestionar hoy?
        </h1>
        <h2 className="text-base font-semibold text-slate-700">
          Explora todas las herramientas disponibles y agiliza tus tareas
          diarias.
        </h2>
      </div>
      {data && (
        <div className="grid grid-cols-5 gap-8">
          {data.map((module) => (
            <ModulesCard
              key={module.name}
              name={module.name}
              order={module.order}
            />
          ))}
        </div>
      )}
    </div>
  );
}
