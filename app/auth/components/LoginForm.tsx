"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { CircularProgress } from "@mui/material";
import { Link } from "@nextui-org/react";

import { emailValidationSchema } from "../validation";

import ReactiveForm from "@/components/form/ReactiveForm";
import ReactiveField from "@/components/form/ReactiveField";
import { MicrosoftIcon } from "@/components/icons/MicrosoftIcon";
import { MailIcon } from "@/components/icons/MailIcon";

function LoginForm({ onEmailSubmit, onAzureLogin, isLoading }) {
  return (
    <div className="flex flex-col w-full gap-4">
      <ReactiveForm
        validationSchema={emailValidationSchema}
        onSubmit={onEmailSubmit}
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
              startContent={<>{isLoading && <CircularProgress size={10} />}</>}
              type="submit"
            >
              Continuar con correo electrónico
            </Button>
            <div className="flex flex-col w-full items-center px-1 py-2">
              <Link
                color="primary"
                href="/auth/forgot-password"
                size="sm"
                underline="hover"
              >
                Olvidé mi contraseña
              </Link>
            </div>
            <div className="flex items-center gap-4 py-2 ">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">Ó</p>
              <Divider className="flex-1" />
            </div>
            <Button
              className="w-full"
              startContent={<MicrosoftIcon />}
              variant="bordered"
              onClick={onAzureLogin}
            >
              Continuar con Microsoft Entra ID
            </Button>
          </div>
        )}
      </ReactiveForm>
    </div>
  );
}

export default LoginForm;
