"use client";

import React, { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { MailIcon } from "lucide-react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { CircularProgress } from "@mui/material";

import { emailValidationSchema } from "../validation";

import ReactiveField from "@/components/form/ReactiveField";
import ReactiveForm from "@/components/form/ReactiveForm";
import httpClient from "@/lib/httpClient";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async ({ email }: { email: string }) => {
    setIsLoading(true);
    try {
      const res = await httpClient.post("/auth/forgot-password", { email });

      setMessage(res.data.message);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
    toast.success(
      "Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña.",
    );
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
              <h2 className="text-lg text-center font-semibold text-slate-700 mb-8">
                Olvidé mi contraseña
              </h2>
              <div className="flex flex-col w-full gap-3">
                <ReactiveForm
                  validationSchema={emailValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ register, errors, control, touchedFields, isValid }) => (
                    <div className="flex flex-col w-full gap-4">
                      <ReactiveField
                        isRequired
                        control={control}
                        endContent={
                          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        errors={errors}
                        label="Correo electrónico"
                        name="email"
                        placeholder="Ingresa tu correo electrónico"
                        register={register}
                        touched={touchedFields.email}
                      />
                      <Button
                        className="standard-btn w-full"
                        color="primary"
                        disabled={!isValid}
                        startContent={
                          <>{isLoading && <CircularProgress size={10} />}</>
                        }
                        type="submit"
                      >
                        Solicitar cambio de contraseña
                      </Button>
                      {message && <p>{message}</p>}
                    </div>
                  )}
                </ReactiveForm>
                <div className="flex flex-col w-full items-center px-1 py-2">
                  <Link
                    color="primary"
                    href="/auth"
                    size="sm"
                    underline="hover"
                  >
                    Incio de sesión
                  </Link>
                </div>
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
