"use client";

import { usePathname } from "next/navigation";

import { settingsOptions } from "@/config/settings-options";
import OptionsCard from "@/components/admin/ajustes/options-card/OptionsCard";

export default function Ajustes() {
  const pathname: string = usePathname();

  return (
    <div className="page">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-cerulean-950">
          Personaliza tu entorno y seguridad.
        </h1>
        <p className="text-base text-slate-700">
          Gestiona términos, políticas y configuraciones clave para una
          experiencia segura y adaptada a tus necesidades.
        </p>
      </div>
      {settingsOptions && (
        <div className="grid grid-cols-2 gap-8">
          {settingsOptions.map((option) => (
            <OptionsCard
              key={option.path}
              option={option}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
}
