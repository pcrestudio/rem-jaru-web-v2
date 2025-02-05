import { FC, ReactNode } from "react";

interface ReportProvisionAmountRecordProps {
  title: string;
  total: number;
  Icon: ReactNode;
}

const ReportProvisionAmountRecord: FC<ReportProvisionAmountRecordProps> = ({
  title,
  total,
  Icon,
}) => {
  return (
    <div className="h-full flex flex-row gap-4 border border-slate-200 p-4 rounded-xl bg-white items-center justify-between">
      {Icon}
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-base font-bold text-cerulean-800">{title}</p>
        <h1 className="text-4xl font-bold text-cerulean-500">S/. {total}</h1>
      </div>
    </div>
  );
};

export default ReportProvisionAmountRecord;
