"use client";

import { Card, CardBody } from "@nextui-org/card";
import React, { FC } from "react";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import format from "@/utils/format_date";
import { AiOutlineBars } from "react-icons/ai";
import {
  Accordion,
  AccordionItem,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";
import { Button } from "@nextui-org/button";

export interface MasterCardProps {
  master: GetMastersDto;
  selectedItem?: (master: GetMastersDto) => void;
}

const MastersCard: FC<MasterCardProps> = ({ master, selectedItem }) => {
  const { data, error, isLoading } = useSWR<GetMasterOptionsDto[]>(
    `${environment.baseUrl}/masters/options?id=${master?.id}`,
    fetcher,
  );

  return (
    <>
      <Accordion variant="splitted">
        {data &&
          data.map((option) => (
            <AccordionItem key={option.id} title={option.name}></AccordionItem>
          ))}
      </Accordion>
    </>
  );
};

export default MastersCard;
