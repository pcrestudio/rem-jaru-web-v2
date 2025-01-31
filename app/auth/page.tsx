"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

import { CredentialsType } from "./types";
import LoginForm from "./components/LoginForm";
import CredentialsForm from "./components/CredentialsForm";
import Step from "./components/Step";

import httpClient from "@/lib/httpClient";

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
      const res = await httpClient.get(`/auth/method/${email}`);

      setEmail(email);
      setAuthMethod(res.data);

      if (res.data === "otp") {
        await httpClient.post("/auth/generate-otp", { email });
        toast.success("OTP generated. Please check your email or SMS.");
      }
    } catch (error) {
      setAuthMethod("password");
    } finally {
      setStep(2);
      setIsLoading(false);
    }
  };

  const generateOtp = async () => {
    await httpClient.post("/auth/generate-otp", { email });
    toast.success(
      "Se ha generado un código de verificación. Por favor revisa tu correo electrónico.",
    );
  };

  const handleLogin = async (credentials: CredentialsType) => {
    setIsLoading(true);
    try {
      const authEndpoint =
        authMethod === "otp" ? "/auth/validate-otp" : "/auth/login";

      const res = await httpClient.post(
        authEndpoint,
        { ...credentials, email },
        {
          withCredentials: true,
        },
      );

      // Store token in localStorage (or cookies)
      const { access_token, user } = res.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to admin
      router.push(redirect);
    } catch (error) {
      console.error("Login error:", error.response?.data?.message);
      toast.error(`Error de inicio sesión: ${error.response?.data?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // For Microsoft Entra ID (Azure AD) login:
  const handleAzureLogin = () => {
    localStorage.removeItem("token");
    // This route should initiate the Azure AD auth flow
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/azure-ad?redirect=${encodeURIComponent(
      redirect,
    )}`;
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="min-h-screen flex items-center">
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1, // Ensure it stays behind the content
          }}
        >
          <Image
            alt="Background"
            layout="fill"
            src="/quellaveco-panoramica.jpg"
            style={{
              filter: "blur(3px) brightness(0.8)",
            }}
            objectFit="cover"
            //quality={80} // Adjust quality for optimization
            priority // Ensures the image is loaded first
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center bg-white bg-opacity-95 p-8 md:p-12 rounded-lg shadow-lg max-w-md mx-auto">
          <h1 className="text-2xl font-semibold text-slate-700 mb-8">
            Bienvenido a <b className="text-cerulean-900">Jaru Software</b>
          </h1>
          <div className="flex w-full gap-3 overflow-hidden relative h-auto min-h-[375px] ">
            <Step isActive={step === 1}>
              <LoginForm
                isLoading={isLoading}
                onAzureLogin={handleAzureLogin}
                onEmailSubmit={handleEmailSubmit}
              />
            </Step>
            <Step isActive={step === 2}>
              <CredentialsForm
                authMethod={authMethod}
                isLoading={isLoading}
                onGoBackClick={() => setStep(1)}
                onResendClick={generateOtp}
                onSubmit={handleLogin}
              />
            </Step>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
