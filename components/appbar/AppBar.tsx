import { User } from "next-auth";
import React, { FC } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { mappingRole } from "@/config/mapping_role";
import { signOut } from "next-auth/react";

export interface AppBarProps {
  user: User;
}

const AppBar: FC<AppBarProps> = ({ user }) => {
  const logout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/auth",
    });
  };

  return (
    <header className="w-full py-4 px-8 bg-cerulean-900 flex flex-row justify-between">
      <img src="/jaru-logo.svg" alt="Jaru Software" />
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
            onClick={logout}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
};

export default AppBar;
