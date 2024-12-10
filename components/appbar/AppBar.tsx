import { User } from "next-auth";
import React, { FC } from "react";
import AppBarUser from "@/components/appbar/AppBarUser";

export interface AppBarProps {
  user: User;
}

const AppBar: FC<AppBarProps> = ({ user }) => {
  return (
    <header className="w-full py-4 px-8 bg-cerulean-950 flex flex-row justify-between">
      <img src="/jaru-logo.svg" alt="Jaru Software" />
      <AppBarUser user={user} />
    </header>
  );
};

export default AppBar;
