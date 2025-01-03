"use client";
import { ReactNode, Suspense } from "react";
import { SWRConfig } from "swr";

import JaruProvider from "@/app/provider/JaruProvider";
import Sidebar from "@/components/sidebar/Sidebar";
import AppBar from "@/components/appbar/AppBar";
import { IUser } from "./usuarios/interfaces";

export default function Layout({ children }: { children: ReactNode }) {
  const user: IUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : {
      id: 1,
      firstName: "Jaru",
      lastName: "Admin",
      name: "Jaru Admin",
      role: "admin",
  };

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
            <Sidebar user={user} />
            <section className="flex-1 flex flex-col items-stretch min-w-0">
              <AppBar user={user} />
              <div className="flex-1 flex flex-col overflow-auto">
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </div>
            </section>
          </main>
        </JaruProvider>
      </SWRConfig>
    </>
  );
}
