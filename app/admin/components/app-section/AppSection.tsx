import { FC, ReactNode } from "react";

interface AppSectionProps {
  children?: ReactNode;
  title: string;
}

const AppSection: FC<AppSectionProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="border border-l-0 border-t-0 border-r-0 border-b-slate-200 p-6 bg-white">
        <h1 className="text-2xl font-bold text-jaruColor-on-surface">
          {title}
        </h1>
      </div>
      <div className="flex flex-col gap-6 px-6">{children}</div>
    </div>
  );
};

export default AppSection;
