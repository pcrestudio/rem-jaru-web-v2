"use client";

import ReusableForm from "@/components/form/ReusableForm";
import { loginFields } from "@/app/auth/constants/login-fields.constant";
import { UserAuthDto } from "@/app/dto/user-auth.dto";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();

  const onSubmit = async (payload: UserAuthDto) => {
    const res = await signIn("credentials", {
      username: payload.email,
      password: payload.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/admin");
    }
  };

  return (
    <section className="flex flex-row min-h-screen">
      <div className="flex items-center p-6 lg:min-w-[40%] lg:p-[120px]">
        <div className="flex flex-col gap-6 flex-grow">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-slate-700">
              Bienvenido a <b className="text-cerulean-900">Jaru Software</b>
            </h1>
          </div>
          <ReusableForm onSubmit={onSubmit} fields={loginFields} />
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
