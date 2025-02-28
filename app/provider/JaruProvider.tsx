"use client";

import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import theme from "@/theme/theme";

const JaruProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <SessionProvider>{children}</SessionProvider> */}
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default JaruProvider;
