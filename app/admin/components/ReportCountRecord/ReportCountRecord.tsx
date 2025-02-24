import { FC, ReactNode } from "react";

interface ReportCountRecordProps {
  title: string;
  total: number;
  description: string;
  Icon: ReactNode;
}

const ReportCountRecord: FC<ReportCountRecordProps> = ({
  title,
  description,
  total,
  Icon,
}) => {
  return (
    <div className="flex flex-col gap-4 border border-slate-200 p-4 rounded-xl bg-white">
      <div className="flex flex-row justify-between items-center">
        <p className="text-cerulean-800 font-bold">{title}</p>
        {Icon}
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl font-bold text-cerulean-500">{total}</h1>
        <div className="bg-slate-400 w-full h-[1px]" />
        <p className="text-base font-bold text-cerulean-800 max-w-[120px] text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ReportCountRecord;
