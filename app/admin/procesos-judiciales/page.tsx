"use client";

import { usePathname } from "next/navigation";

import ModuleSlugComponent from "@/app/admin/components/module-slug-component/ModuleSlugComponent";

export default function ProcesosJudiciales() {
  const pathname: string = usePathname();

  return <ModuleSlugComponent pathname={pathname} />;
}
