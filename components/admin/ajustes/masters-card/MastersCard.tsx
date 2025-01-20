"use client";

import React, { FC } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import useSWR from "swr";

import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";

export interface MasterCardProps {
  master: GetMastersDto;
  selectedItem?: (master: GetMastersDto) => void;
}

const MastersCard: FC<MasterCardProps> = ({ master }) => {
  const { data } = useSWR<GetMasterOptionsDto[]>(
    `${environment.baseUrl}/masters/options?id=${master?.id}`,
    fetcher,
  );

  return (
    <>
      <Accordion variant="splitted">
        {data &&
          data.map((option) => (
            <AccordionItem key={option.id} title={option.name} />
          ))}
      </Accordion>
    </>
  );
};

export default MastersCard;
