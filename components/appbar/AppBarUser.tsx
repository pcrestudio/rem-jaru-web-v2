import React, { FC } from "react";
import { User } from "next-auth";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

import { mappingRole } from "@/config/mapping_role";

interface AppBarUserProps {
  user: User;
}

const AppBarUser: FC<AppBarUserProps> = ({ user }) => {
  const logout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/auth",
    });
  };

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
          onClick={logout}
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AppBarUser;
