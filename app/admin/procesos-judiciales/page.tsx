"use client";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import { GetSubmoduleDto } from "@/app/dto/modules/get-submodule.dto";
import ModulesCard from "@/components/admin/modules/ModulesCard";

export default function ProcesosJudiciales() {
  const pathname: string = usePathname();
  const slug: string = pathname.split("/")[2];

  const { data, error, isLoading } = useSWR<GetSubmoduleDto[]>(
    `${environment.baseUrl}/modules/submodules?slug=${slug}`,
    fetcher,
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-cerulean-950">
          ¿Qué te gustaría gestionar hoy?
        </h1>
        <h2 className="text-base font-semibold text-slate-700">
          Explora todas las herramientas disponibles y agiliza tus tareas
          diarias.
        </h2>
      </div>
      {data && (
        <div className="grid grid-cols-3 gap-8">
          {data.map((module) => (
            <ModulesCard
              key={module.name}
              module={module}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
}
