import { Card, CardBody } from "@heroui/card";
import { FC, ReactNode } from "react";
import {
  AiOutlineReconciliation,
  AiOutlineFileDone,
  AiOutlineArrowRight,
  AiOutlineSecurityScan,
} from "react-icons/ai";
import { TbForms } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import Link from "next/link";

import { OptionCard } from "@/config/settings-options";
import useStore from "@/lib/store";

export interface OptionsCardProps {
  option: OptionCard;
  isDisabled?: boolean;
  pathname?: string;
}

const renderIcon: Record<number, ReactNode> = {
  1: <AiOutlineReconciliation className="text-cerulean-950" size="64" />,
  2: <AiOutlineFileDone className="text-cerulean-950" size="64" />,
  3: <TbForms className="text-cerulean-950" size="64" />,
  4: <AiOutlineSecurityScan className="text-cerulean-950" size="64" />,
  5: <MdOutlineSecurity className="text-cerulean-950" size="64" />,
};

const OptionsCard: FC<OptionsCardProps> = ({ option, pathname }) => {
  const { user } = useStore();

  return (
    <Link href={option.isDisabled(user) ? "" : `${pathname}/${option?.path}`}>
      <Card
        className={`min-h-[138px] shadow-none border border-slate-200 motion-reduce:transition ${option.isDisabled(user) ? "cursor-not-allowed hover:border-red-600 hover:bg-red-50" : "cursor-pointer hover:border-cerulean-600 hover:bg-cerulean-50"}`}
        isDisabled={option.isDisabled(user)}
      >
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
