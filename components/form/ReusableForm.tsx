import { FC, FormEvent, ReactNode } from "react";

export interface ReusableFormProps {
  handleSubmit: (event: FormEvent) => void;
  children: ReactNode;
  className?: string;
}

const ReusableForm: FC<ReusableFormProps> = ({
  handleSubmit,
  children,
  className,
}) => {
  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default ReusableForm;
