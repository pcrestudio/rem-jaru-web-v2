"use client";

import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

const JaruProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default JaruProvider;
