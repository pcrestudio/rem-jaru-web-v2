import { FC, ReactNode } from "react";

interface ReportProvisionAmountRecordProps {
  title: string;
  total: number | string;
  currency: string;
  Icon: ReactNode;
}

const ReportProvisionAmountRecord: FC<ReportProvisionAmountRecordProps> = ({
  title,
  total,
  Icon,
  currency,
}) => {
  return (
    <div className="h-full flex flex-col gap-4 border border-slate-200 p-4 rounded-xl bg-white items-center justify-between">
      {Icon}
      <div className="flex flex-col gap-4">
        <p className="text-md font-bold text-cerulean-800 text-center">
          {title}
        </p>
        <h1 className="text-lg font-bold text-cerulean-500 text-center">
          {currency} {total}
        </h1>
      </div>
    </div>
  );
};

export default ReportProvisionAmountRecord;
