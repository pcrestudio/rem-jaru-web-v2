import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
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

    const idMatch = path.match(/^(\d+)$/); // Busca si el path es un número (ID)
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
          href={!bread.disabled ? bread.href : undefined}
          onClick={(e) => {
            if (bread.disabled) e.preventDefault();
          }}
          className="capitalize"
          style={{
            color: bread.disabled ? "red" : "blue",
            cursor: bread.disabled ? "not-allowed" : "pointer",
          }}
        >
          {bread.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsPath;
