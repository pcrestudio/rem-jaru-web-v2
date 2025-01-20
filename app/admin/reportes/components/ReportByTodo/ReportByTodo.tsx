import { FC } from "react";
import { ReportTabType } from "@/app/admin/reportes/types/ReportTabType";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";

const ReportByTodo: FC<ReportTabType> = ({ slug }) => {
  const { data } = useSWR<any>(
    `${environment.baseUrl}/report/${slug}`,
    fetcher,
  );

  console.log(data);

  return <p>{slug}</p>;
};

export default ReportByTodo;
