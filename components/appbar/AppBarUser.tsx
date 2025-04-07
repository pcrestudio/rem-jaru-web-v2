"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Chip } from "@heroui/chip";
import { deleteCookie, getCookie } from "cookies-next";

import { mappingRole } from "@/config/mapping_role";
import httpClient from "@/lib/httpClient";
import { IUser } from "@/app/admin/usuarios/interfaces";
import useStore from "@/lib/store";

interface AppBarUserProps {
  user: IUser;
}

const AppBarUser: FC<AppBarUserProps> = ({ user }) => {
  const router = useRouter();
  const { updateFilter } = useStore();

  const handleSignOut = async () => {
    await httpClient.post("/auth/logout", {}, { withCredentials: true });
    const sid = getCookie("connect.sid")?.toString();

    if (sid) {
      deleteCookie("connect.sid");
    }

    localStorage.removeItem("token");

    updateFilter({ queryReport: "", search: null });

    router.push("/auth");
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <div className="flex flex-col gap-1">
          <p className="text-md font-bold text-white cursor-pointer self-end">
            {user?.displayName}
          </p>
          <Chip
            className="text-xs cursor-pointer text-white bg-transparent border border-cerulean-500 self-end"
            variant="faded"
          >
            {mappingRole[user?.role]}{" "}
            {user?.studio && <span>- {user?.studio.name}</span>}
          </Chip>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="delete"
          className="text-cerulean-950 data-[hover=true]:bg-cerulean-200"
          onPress={handleSignOut}
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AppBarUser;
