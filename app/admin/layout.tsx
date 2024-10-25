"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import JaruProvider from "@/app/provider/JaruProvider";
import Sidebar from "@/components/sidebar/Sidebar";
import AppBar from "@/components/appbar/AppBar";
import { SWRConfig } from "swr";

export default function Layout({ children }: { children: ReactNode }) {
  const { data } = useSession();

  return (
    <>
      <AppBar user={data?.user} />
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <JaruProvider>
          <main className="flex overflow-hidden items-stretch flex-1 bg-cerulean-50/[.45]">
            <Sidebar user={data?.user} />
            <section className="flex-1 flex flex-col items-stretch min-w-0">
              <div className="flex-1 flex flex-col overflow-auto p-10">
                {children}
              </div>
            </section>
          </main>
        </JaruProvider>
      </SWRConfig>
    </>
  );
}
