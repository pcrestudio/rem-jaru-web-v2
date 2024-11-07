import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { FC } from "react";

interface BreadcrumbsPathProps {
  pathname: string;
}

interface BreadcrumbsPathState {
  href: string;
  name: string;
}

const generateBreadcrumbsPath = (pathname: string): BreadcrumbsPathState[] => {
  const breads = pathname
    .split("/")
    .filter((path) => path !== "" && path !== "admin");
  const breadsPath: BreadcrumbsPathState[] = breads.map((path) => ({
    href: `/admin/${path}`,
    name: path,
  }));

  return [{ href: "/admin", name: "Inicio" }, ...breadsPath];
};

const BreadcrumbsPath: FC<BreadcrumbsPathProps> = ({ pathname }) => {
  const breads = pathname.split("/").filter((path) => path !== "");

  return (
    <Breadcrumbs>
      {generateBreadcrumbsPath(pathname).map((bread) => (
        <BreadcrumbItem
          key={bread.name}
          href={bread.href}
          className="capitalize"
        >
          {bread.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsPath;
