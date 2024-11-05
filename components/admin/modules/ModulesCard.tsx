import { Card, CardBody } from "@nextui-org/card";
import { FC, ReactNode } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiAuctionLine } from "react-icons/ri";
import { RiEye2Line } from "react-icons/ri";
import Link from "next/link";
import { GetSubmoduleDto } from "@/app/dto/modules/get-submodule.dto";
import { mappingSubmodules } from "@/config/mapping_submodules";

export interface ModulesCardProps {
  module: GetSubmoduleDto;
  pathname?: string;
  isSubmodule?: boolean;
}

const renderIcon: Record<number, ReactNode> = {
  1: <RiAuctionLine size="64" className="text-cerulean-950" />,
  2: <RiEye2Line size="64" className="text-cerulean-950" />,
};

const ModulesCard: FC<ModulesCardProps> = ({
  module,
  isSubmodule = false,
  pathname,
}) => {
  return (
    <Link
      href={`${isSubmodule ? `${pathname}/${mappingSubmodules[module?.slug]}` : `/admin/${module.slug}`}`}
    >
      <Card className="min-h-[138px] cursor-pointer shadow-none border border-slate-200 motion-reduce:transition hover:border-cerulean-600 hover:bg-cerulean-50">
        <CardBody className="flex flex-row gap-2 items-center justify-between transition">
          <div className="flex flex-col gap-4 lg:max-w-[180px] p-1">
            <h1 className="text-cerulean-950 font-bold">{module?.name}</h1>
            <div className="flex flex-row gap-2 text-cerulean-400 hover:text-cerulean-600 transition cursor-pointer">
              <p className="text-xs">Ver módulo</p>
              <AiOutlineArrowRight size="14" />
            </div>
          </div>
          <div className="flex justify-center">{renderIcon[module?.order]}</div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ModulesCard;
