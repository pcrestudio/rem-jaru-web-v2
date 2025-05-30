"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AzureAdCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Get token and redirect params from the query
    const token = searchParams.get("token");
    const redirect = searchParams.get("redirect") || "/admin";

    // 2. Store token in localStorage (or cookies)
    if (token) {
      localStorage.setItem("token", token);

      const decode = jwtDecode(token);

      localStorage.setItem("user", JSON.stringify(decode["user"]));
    }

    // 3. Redirect to the final destination
    router.replace(redirect);
  }, [router, searchParams]);

  return <p>Processing Azure AD login...</p>;
}
