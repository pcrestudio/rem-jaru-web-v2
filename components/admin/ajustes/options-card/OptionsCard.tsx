import { Card, CardBody } from "@nextui-org/card";
import { FC, ReactNode } from "react";
import {
  AiOutlineCopyright,
  AiOutlineReconciliation,
  AiOutlineFileDone,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Link from "next/link";
import { OptionCard } from "@/config/settings-options";

export interface OptionsCardProps {
  option: OptionCard;
  pathname?: string;
}

const renderIcon: Record<number, ReactNode> = {
  1: <AiOutlineReconciliation size="64" className="text-cerulean-950" />,
  2: <AiOutlineFileDone size="64" className="text-cerulean-950" />,
  3: <AiOutlineCopyright size="64" className="text-cerulean-950" />,
};

const OptionsCard: FC<OptionsCardProps> = ({ option, pathname }) => {
  return (
    <Link href={`${pathname}/${option?.path}`}>
      <Card className="min-h-[138px] cursor-pointer shadow-none border border-slate-200 motion-reduce:transition hover:border-cerulean-600 hover:bg-cerulean-50">
        <CardBody className="flex flex-row gap-2 items-center transition justify-between p-4 w-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-cerulean-950 font-bold">{option?.name}</h1>
            <div className="flex flex-row gap-2 text-cerulean-400 hover:text-cerulean-600 transition cursor-pointer">
              <p className="text-xs">Ver opción</p>
              <AiOutlineArrowRight size="14" />
            </div>
          </div>
          <div className="flex justify-center">{renderIcon[option?.order]}</div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default OptionsCard;
