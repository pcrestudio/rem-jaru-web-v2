"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import ReactiveForm from "@/components/form/ReactiveForm";
import ReactiveField from "@/components/form/ReactiveField";
import authValidationSchema from "@/app/validations/auth.validation";
import { UserAuthDto } from "@/app/dto/user-auth.dto";

export default function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: any) => {
    const payload = event as UserAuthDto;

    setIsLoading(true);

    const res = await signIn("credentials", {
      username: payload.email,
      password: payload.password,
      redirect: false,
    });

    if (res?.ok) {
      setIsLoading(false);
      router.push("/admin");
    } else {
      setIsLoading(false);
      toast.error("Credenciales incorrectas.");
    }
  };

  useEffect(() => {}, []);

  return (
    <section className="flex flex-row min-h-screen">
      <div className="flex items-center p-6 lg:w-[55%] lg:p-[120px]">
        <div className="flex flex-col gap-6 flex-grow">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-slate-700">
              Bienvenido a <b className="text-cerulean-900">Jaru Software</b>
            </h1>
          </div>
          <ReactiveForm
            validationSchema={authValidationSchema}
            onSubmit={onSubmit}
          >
            {({ register, errors, control, touchedFields, isValid }) => (
              <div className="grid grid-cols-12 gap-4">
                <ReactiveField
                  className="col-span-12"
                  control={control}
                  errors={errors}
                  label="Correo electrónico"
                  name="email"
                  register={register}
                  touched={touchedFields.email}
                />
                <ReactiveField
                  className="col-span-12"
                  control={control}
                  errors={errors}
                  label="Contraseña"
                  name="password"
                  register={register}
                  touched={touchedFields.password}
                  type="password"
                />
                <Button
                  className="standard-btn w-full col-span-12"
                  color="primary"
                  disabled={!isValid}
                  startContent={
                    <>{isLoading && <CircularProgress size={10} />}</>
                  }
                  type="submit"
                >
                  Iniciar sesión
                </Button>
              </div>
            )}
          </ReactiveForm>
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
  );
}
