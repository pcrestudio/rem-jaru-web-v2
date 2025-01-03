"use client";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { SWRConfig } from "swr";

import JaruProvider from "@/app/provider/JaruProvider";
import Sidebar from "@/components/sidebar/Sidebar";
import AppBar from "@/components/appbar/AppBar";
import { IUser } from "./usuarios/interfaces";

export default function Layout({ children }: { children: ReactNode }) {
  const [clientUser, setClientUser] = useState<IUser>({
    id: 1,
    firstName: "Jaru",
    lastName: "Admin",
    role: "admin",
    email: "pcusir@gmail.com",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setClientUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <JaruProvider>
          <main className="flex overflow-hidden items-stretch flex-1 bg-jaruColor-white">
            <Sidebar user={clientUser} />
            <div className="flex-1 flex flex-col items-stretch min-w-0">
              <AppBar user={clientUser} />
              <div className="flex-1 flex flex-col overflow-auto">
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </div>
            </div>
          </main>
        </JaruProvider>
      </SWRConfig>
    </>
  );
}
