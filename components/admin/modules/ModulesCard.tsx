import { Card, CardBody } from "@heroui/card";
import { FC, ReactNode } from "react";
import { PiTree } from "react-icons/pi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { TbUserStar } from "react-icons/tb";
import { RiAuctionLine } from "react-icons/ri";
import { TbMatrix } from "react-icons/tb";
import { RiEye2Line } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa6";
import { LuFileCheck } from "react-icons/lu";
import Link from "next/link";

import { GetSubmoduleDto } from "@/app/dto/modules/get-submodule.dto";
import { mappingSubmodules } from "@/config/mapping_submodules";

export interface ModulesCardProps {
  module: GetSubmoduleDto;
  pathname?: string;
  isSubmodule?: boolean;
}

const renderSVG: Record<string, ReactNode> = {
  judicial_process_administrative: (
    <img alt="" height={120} src="/logos/BLACK-ACA.svg" />
  ),
  judicial_process_labor_court: (
    <img alt="" height={120} src="/logos/BLACK-LABO.svg" />
  ),
  judicial_process_civil_court: (
    <img alt="" height={120} src="/logos/BLACK-CIVIL.svg" />
  ),
  judicial_process_criminal: (
    <img alt="" height={120} src="/logos/BLACK-PENAL.svg" />
  ),
  supervision_oefa: <img alt="" height={120} src="/logos/BLACK-OEFA.svg" />,
  supervision_osinergmin: (
    <img alt="" height={120} src="/logos/BLACK-OSINERGMIN.svg" />
  ),
  supervision_sunafil: (
    <img alt="" height={120} src="/logos/BLACK-SUNAFIL.svg" />
  ),
  supervision_ana: <img alt="" height={120} src="/logos/BLACK-ANA.svg" />,
};

const renderIcon: Record<number, ReactNode> = {
  1: <RiAuctionLine className="text-cerulean-950" size="64" />,
  2: <RiEye2Line className="text-cerulean-950" size="64" />,
  3: <PiTree className="text-cerulean-950" size="64" />,
  4: <TbUserStar className="text-cerulean-950" size="64" />,
  5: <TbMatrix className="text-cerulean-950" size="64" />,
  6: <FaRegHandshake className="text-cerulean-950" size="64" />,
  7: <LuFileCheck className="text-cerulean-950" size="64" />,
};

const ModulesCard: FC<ModulesCardProps> = ({
  module,
  isSubmodule = false,
  pathname,
}) => {
  return (
    <Link
      href={`${module.isActive ? (isSubmodule ? `${pathname}/${mappingSubmodules[module?.slug]}` : `/admin/${module.slug}`) : ""}`}
    >
      {isSubmodule ? (
        <Card
          className={`min-h-[138px] cursor-pointer shadow-none border border-slate-200 motion-reduce:transition ${!module.isActive ? "cursor-not-allowed hover:border-red-600 hover:bg-red-50" : "cursor-pointer hover:border-cerulean-600 hover:bg-cerulean-50"}`}
          isDisabled={!module.isActive}
        >
          <CardBody className="flex flex-col gap-2 items-center justify-between transition">
            <div className="flex flex-col gap-4 items-center lg:max-w-[180px] p-1">
              <div className="flex justify-center">
                {renderSVG[module?.slug]}
              </div>
              <div className="flex flex-row gap-2 text-cerulean-400 hover:text-cerulean-600 transition cursor-pointer">
                <p className="text-xs">Ver módulo</p>
                <AiOutlineArrowRight size="14" />
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card
          className={`min-h-[138px] cursor-pointer shadow-none border border-slate-200 motion-reduce:transition ${!module.isActive ? "cursor-not-allowed hover:border-red-600 hover:bg-red-50" : "cursor-pointer hover:border-cerulean-600 hover:bg-cerulean-50"}`}
          isDisabled={!module.isActive}
        >
          <CardBody className="flex flex-row gap-2 items-center justify-between transition">
            <div className="flex flex-col gap-4 lg:max-w-[180px] p-1">
              <h1 className="text-cerulean-950 font-bold">{module?.name}</h1>
              <div className="flex flex-row gap-2 text-cerulean-400 hover:text-cerulean-600 transition cursor-pointer">
                <p className="text-xs">Ver módulo</p>
                <AiOutlineArrowRight size="14" />
              </div>
            </div>
            <div className="flex justify-center">
              {renderIcon[module?.order]}
            </div>
          </CardBody>
        </Card>
      )}
    </Link>
  );
};

export default ModulesCard;
