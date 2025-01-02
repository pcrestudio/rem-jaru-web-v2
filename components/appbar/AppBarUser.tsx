"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
//import { signOut } from "next-auth/react";

import { mappingRole } from "@/config/mapping_role";
import httpClient from "@/lib/httpClient";
import { IUser } from "@/app/admin/usuarios/interfaces";

interface AppBarUserProps {
  user: IUser;
}

const AppBarUser: FC<AppBarUserProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    // 1. Call the NestJS logout endpoint to clear HttpOnly cookie
    await httpClient.post("/auth/logout", {}, { withCredentials: true });

    // 2. Remove token from localStorage
    localStorage.removeItem("token");

    // 3. Redirect to the login page or home
    router.push("/auth");
  };

  // const logout = async () => {
  //   await signOut({
  //     redirect: true,
  //     callbackUrl: "/auth",
  //   });
  // };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-white cursor-pointer">{user?.name}</p>
          <p className="text-xs text-cerulean-200 cursor-pointer self-end">
            {mappingRole[user?.role]}
          </p>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="delete"
          className="text-cerulean-950 data-[hover=true]:bg-cerulean-200"
          onClick={handleSignOut}
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AppBarUser;
