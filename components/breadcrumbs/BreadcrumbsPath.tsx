import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { FC } from "react";

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

const mappingNamePath: Record<string, string> = {
  "procesos-judiciales": "Procesos Judiciales",
  "procesos-judiciales-administrativos": "Procesos Judiciales Administrativos",
  "procesos-judiciales-laborales": "Procesos Judiciales Laborales",
  "procesos-judiciales-penales": "Procesos Judiciales Penales",
  create: "Nuevo",
  edit: "Editar",
  ajustes: "Ajustes",
  personalizar: "Personalizar",
  reglas: "Reglas",
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
  console.log(generateBreadcrumbsPath(pathname));

  return (
    <Breadcrumbs size="lg">
      {generateBreadcrumbsPath(pathname).map((bread) => (
        <BreadcrumbItem
          key={bread.href}
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
