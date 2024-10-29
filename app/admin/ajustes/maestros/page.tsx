"use client";

import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import React from "react";
import MastersCard from "@/components/admin/ajustes/masters-card/MastersCard";

export default function Maestros() {
  const { data, error, isLoading } = useSWR<GetMastersDto[]>(
    `${environment.baseUrl}/masters`,
    fetcher,
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      {data &&
        data.map((master) => <MastersCard key={master.name} master={master} />)}
    </div>
  );
}
