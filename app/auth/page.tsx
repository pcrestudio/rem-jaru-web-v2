"use client";

import { UserAuthDto } from "@/app/dto/user-auth.dto";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import ReactiveForm from "@/components/form/ReactiveForm";
import ReactiveField from "@/components/form/ReactiveField";
import authValidationSchema from "@/app/validations/auth.validation";
import toast from "react-hot-toast";

export default function Auth() {
  const router = useRouter();

  const onSubmit = async (event: any) => {
    const payload = event as UserAuthDto;

    const res = await signIn("credentials", {
      username: payload.email,
      password: payload.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/admin");
    } else {
      toast.error("Credenciales incorrectas.");
    }
  };

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
            onSubmit={onSubmit}
            validationSchema={authValidationSchema}
          >
            {({ register, errors, control, touchedFields, isValid }) => (
              <div className="grid grid-cols-12 gap-4">
                <ReactiveField
                  name="email"
                  label="Correo electrónico"
                  register={register}
                  errors={errors}
                  control={control}
                  touched={touchedFields.email}
                  className="col-span-12"
                />
                <ReactiveField
                  name="password"
                  type="password"
                  label="Contraseña"
                  register={register}
                  errors={errors}
                  control={control}
                  touched={touchedFields.password}
                  className="col-span-12"
                />
                <Button
                  color="primary"
                  type="submit"
                  disabled={!isValid}
                  className="standard-btn w-full col-span-12"
                >
                  Iniciar sesión
                </Button>
              </div>
            )}
          </ReactiveForm>
        </div>
      </div>
      <div className="relative hidden lg:flex lg:flex-grow">
        <div className="absolute bg-black/[.35] z-10 w-full h-full"></div>
        <img
          src="/anglo-american-quellaveco-inversion-minera.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
