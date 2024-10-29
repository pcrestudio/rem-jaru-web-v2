"use client";

import { Card, CardBody } from "@nextui-org/card";
import { FC } from "react";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import format from "@/utils/format_date";
import {
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

export interface MasterCardProps {
  master: GetMastersDto;
}

const MastersCard: FC<MasterCardProps> = ({ master }) => {
  const { data, error, isLoading } = useSWR<GetMasterOptionsDto[]>(
    `${environment.baseUrl}/masters/options?id=${master?.id}`,
    fetcher,
  );

  return (
    <>
      <Card className="shadow-none border border-slate-200 motion-reduce:transition">
        <CardBody className="flex flex-col gap-2 transition">
          <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row justify-between">
                <h1 className="text-cerulean-950 font-bold">{master?.name}</h1>
                <Dropdown>
                  <DropdownTrigger>
                    <VerticalDotsIcon
                      className="text-cerulean-950 cursor-pointer"
                      size={24}
                    />
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>Editar</DropdownItem>
                    <DropdownItem>
                      {master.isActive ? "Desactivar" : "Activar"}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <p className="text-xs text-slate-400">
                Creado el: {format(master?.createdAt)}
              </p>
            </div>
            <p className="text-xs text-cerulean-950 font-semibold">
              {data?.length} opciones
            </p>
          </div>
          {data && data.length > 0 && (
            <>
              <Divider className="bg-slate-200" />
              <div className="grid grid-cols-2">
                {data.map((option) => (
                  <p key={option?.id}>{option.name}</p>
                ))}
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default MastersCard;
