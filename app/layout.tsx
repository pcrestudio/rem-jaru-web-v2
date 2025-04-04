import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import { ReactNode, Suspense } from "react";
import { Toaster } from "react-hot-toast";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import JaruProvider from "@/app/provider/JaruProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/jaru.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <JaruProvider>
          <Toaster
            position="bottom-left"
            toastOptions={{
              duration: 5000,
            }}
          />
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex flex-col w-full relative bg-cerulean-50/[.45] lg:h-screen lg:overflow-hidden">
                {children}
              </div>
            </Suspense>
          </Providers>
        </JaruProvider>
      </body>
    </html>
  );
}
