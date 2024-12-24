"use client";

import { usePathname } from "next/navigation";

import ModuleSlugComponent from "@/app/admin/components/module-slug-component/ModuleSlugComponent";

export default function Supervisiones() {
  const pathname: string = usePathname();

  return <ModuleSlugComponent pathname={pathname} />;
}
