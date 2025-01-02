"use client";

import React, { Suspense, useState } from "react";

import httpClient from "@/lib/httpClient";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CredentialsType } from "./types";
import LoginForm from "./components/LoginForm";
import CredentialsForm from "./components/CredentialsForm";
import Step from "./components/Step";

export default function Auth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: Password/OTP input
  const [authMethod, setAuthMethod] = useState<"otp" | "password" | null>(null);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async ({ email }: { email: string }) => {
    setIsLoading(true);
    try {
      const res = await httpClient.get(`/users/find/${email}`);

      setEmail(email);
      setAuthMethod(res.data.authMethod);

      if (res.data.authMethod === "otp") {
        await httpClient.post("/otp/generate", { email });
        toast.success("OTP generated. Please check your email or SMS.");
      }

      setStep(2);
    } catch (error) {
      toast.error("Error verifying email.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials: CredentialsType) => {
    setIsLoading(true);
    try {
      const authEndpoint =
        authMethod === "otp" ? "/otp/validate" : "/auth/login";

      const res = await httpClient.post(
        authEndpoint,
        { ...credentials, email },
        {
          withCredentials: true,
        }
      );

      // Store token in localStorage (or cookies)
      const { access_token } = res.data;
      localStorage.setItem("token", access_token);

      // Redirect to admin
      router.push(redirect);
    } catch (error) {
      console.error("Login error:", error);
      //alert("Login failed");
      toast.error("Credenciales incorrectas.");
    } finally {
      setIsLoading(false);
    }
  };

  // For Microsoft Entra ID (Azure AD) login:
  const handleAzureLogin = () => {
    localStorage.removeItem("token");
    // This route should initiate the Azure AD auth flow
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/azure-ad?redirect=${encodeURIComponent(
      redirect
    )}`;
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="flex flex-row min-h-screen bg-gradient-to-br from-blue-400 via-teal-400 to-green-500">
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="flex w-full max-w-sm flex-col items-center">
            <div className="w-full max-w-full p-8 bg-white shadow-lg rounded-lg">
              <h1 className="text-2xl font-semibold text-slate-700 mb-8">
                Bienvenido a <b className="text-cerulean-900">Jaru Software</b>
              </h1>
              <div className="flex w-full gap-3 overflow-hidden relative h-auto min-h-[350px]">
                <Step isActive={step === 1}>
                  <LoginForm
                    onEmailSubmit={handleEmailSubmit}
                    onAzureLogin={handleAzureLogin}
                    isLoading={isLoading}
                  />
                </Step>
                <Step isActive={step === 2}>
                  <CredentialsForm
                    onSubmit={handleLogin}
                    authMethod={authMethod}
                    isLoading={isLoading}
                    onGoBackClick={() => setStep(1)}
                  />
                </Step>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden lg:flex lg:flex-grow">
          <div className="absolute bg-black/[.35] z-10 w-full h-full" />
          <img
            alt=""
            className="h-full w-full object-cover"
            src="/anglo-american-quellaveco-inversion-minera.jpg"
          />
        </div>
      </section>
    </Suspense>
  );
}
