import useSWR from "swr";
import { FC } from "react";

import ModulesCard from "@/components/admin/modules/ModulesCard";
import { GetSubmoduleDto } from "@/app/dto/modules/get-submodule.dto";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";

interface ModuleSlugComponentProps {
  pathname: string;
}

const ModuleSlugComponent: FC<ModuleSlugComponentProps> = ({ pathname }) => {
  const slug: string = pathname.split("/")[2];

  const { data } = useSWR<GetSubmoduleDto[]>(
    `${environment.baseUrl}/modules/submodules?slug=${slug}`,
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
              isSubmodule={true}
              module={module}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleSlugComponent;
