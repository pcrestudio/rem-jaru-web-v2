import React, { FC } from "react";

import AppBarUser from "@/components/appbar/AppBarUser";
import { IUser } from "@/app/admin/usuarios/interfaces";

export interface AppBarProps {
  user: IUser;
}

const AppBar: FC<AppBarProps> = ({ user }) => {
  return (
    <header className="w-full py-4 px-8 bg-cerulean-950 flex flex-row justify-between">
      <img alt="Jaru Software" src="/jaru.svg" />
      <AppBarUser user={user} />
    </header>
  );
};

export default AppBar;
