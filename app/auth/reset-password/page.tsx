"use client";

import React, { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { CircularProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";

import { passswordValidationSchema } from "../validation";
import PasswordHints from "../components/PasswordHints";

import ReactiveField from "@/components/form/ReactiveField";
import ReactiveForm from "@/components/form/ReactiveForm";
import httpClient from "@/lib/httpClient";

export default function ResetPasswordPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async ({ password }: { password: string }) => {
    setIsLoading(true);

    const token = searchParams.get("token");

    if (!token) {
      setMessage("Enlace invalido.");

      return;
    }

    try {
      const res = await httpClient.post("/auth/reset-password", {
        token,
        password,
      });

      setMessage(res.data.message);
      toast.success(
        "Contraseña restablecida correctamente. Por favor inicia sesión.",
      );

      router.push("/auth");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error resetting password");
    } finally {
      setIsLoading(false);
    }
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
                  validationSchema={passswordValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    register,
                    errors,
                    control,
                    touchedFields,
                    isValid,
                    watch,
                  }) => {
                    const passwordValue = watch("password", "");

                    return (
                      <div className="flex flex-col w-full gap-4">
                        <ReactiveField
                          className="col-span-12"
                          control={control}
                          endContent={
                            <button type="button" onClick={toggleVisibility}>
                              {isVisible ? (
                                <Icon
                                  className="pointer-events-none text-2xl text-default-400"
                                  icon="solar:eye-closed-linear"
                                />
                              ) : (
                                <Icon
                                  className="pointer-events-none text-2xl text-default-400"
                                  icon="solar:eye-bold"
                                />
                              )}
                            </button>
                          }
                          errors={errors}
                          label={"Ingresa tu clave secreta"}
                          name={"password"}
                          register={register}
                          touched={touchedFields.password}
                          type={isVisible ? "text" : "password"}
                        />
                        <PasswordHints passwordValue={passwordValue} />

                        <ReactiveField
                          className="col-span-12"
                          control={control}
                          endContent={
                            <button type="button" onClick={toggleVisibility}>
                              {isVisible ? (
                                <Icon
                                  className="pointer-events-none text-2xl text-default-400"
                                  icon="solar:eye-closed-linear"
                                />
                              ) : (
                                <Icon
                                  className="pointer-events-none text-2xl text-default-400"
                                  icon="solar:eye-bold"
                                />
                              )}
                            </button>
                          }
                          errors={errors}
                          label="Confirma tu nueva contraseña"
                          name="confirmPassword"
                          register={register}
                          touched={touchedFields.confirmPassword}
                          type={isVisible ? "text" : "password"}
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
                    );
                  }}
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
