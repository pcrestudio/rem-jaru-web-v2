import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { FC } from "react";

import { mappingNamePath } from "@/config/mapping_submodules";

interface BreadcrumbsPathProps {
  pathname: string;
}

interface BreadcrumbsPathState {
  href: string;
  name: string;
  disabled: boolean;
}

const validRoutes = {
  "": true,
  ajustes: true,
  personalizar: true,
  reglas: false,
  create: false,
  edit: false,
  cej: false,
  incidencias: false,
};

const generateBreadcrumbsPath = (pathname: string): BreadcrumbsPathState[] => {
  const breads = pathname
    .split("/")
    .filter((path) => path !== "" && path !== "admin");

  return breads.map((path, index) => {
    const href = `/admin/${breads.slice(0, index + 1).join("/")}`;

    let disabled = false;

    if (validRoutes[path] === false) {
      disabled = true;
    }

    let name = mappingNamePath[path] ?? path;

    const idMatch = path.match(/^(\d+)$/);

    if (idMatch) {
      name = `Detalle para ${idMatch[1]}`; // Usar el ID en el nombre, ejemplo: "Detalle 1"
    }

    return {
      href: disabled ? undefined : href,
      name,
      disabled: disabled,
    };
  });
};

const BreadcrumbsPath: FC<BreadcrumbsPathProps> = ({ pathname }) => {
  return (
    <Breadcrumbs size="lg">
      {generateBreadcrumbsPath(pathname).map((bread) => (
        <BreadcrumbItem
          key={`${bread.href}-yes`}
          className="capitalize"
          href={!bread.disabled ? bread.href : undefined}
          style={{
            color: bread.disabled ? "red" : "blue",
            cursor: bread.disabled ? "not-allowed" : "pointer",
          }}
          onClick={(e) => {
            if (bread.disabled) e.preventDefault();
          }}
        >
          {bread.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsPath;
