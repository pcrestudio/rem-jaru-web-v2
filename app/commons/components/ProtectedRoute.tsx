"use client";

import React, { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AuthContext } from "./AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If no token found, redirect to login
    // Append ?redirect=<current_pathname> so we know where to go back
    if (!token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [token, router, pathname]);

  // While checking or redirecting, you could render a loading indicator or nothing
  if (!token) {
    return null; // Or a loading spinner
  }

  // If the user has a token, render the protected content
  return <>{children}</>;
}
