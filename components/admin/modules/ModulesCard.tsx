import { Card, CardBody } from "@nextui-org/card";
import { FC, ReactNode } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiAuctionLine } from "react-icons/ri";
import { RiEye2Line } from "react-icons/ri";

export interface ModulesCardProps {
  name: string;
  order?: number;
}

const renderIcon: Record<number, ReactNode> = {
  1: <RiAuctionLine size="64" className="text-cerulean-950" />,
  2: <RiEye2Line size="64" className="text-cerulean-950" />,
};

const ModulesCard: FC<ModulesCardProps> = ({ name, order }) => {
  return (
    <Card className="cursor-pointer shadow-none border border-slate-200 motion-reduce:transition hover:border-cerulean-600 hover:bg-cerulean-50">
      <CardBody className="flex flex-col gap-2 items-center transition">
        {renderIcon[order]}
        <h1 className="text-cerulean-950 font-bold">{name}</h1>
        <div className="flex flex-row gap-2 text-cerulean-400 hover:text-cerulean-600 transition cursor-pointer">
          <p className="text-xs">Ver módulo</p>
          <AiOutlineArrowRight size="14" />
        </div>
      </CardBody>
    </Card>
  );
};

export default ModulesCard;
