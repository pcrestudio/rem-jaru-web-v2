"use client";

import React from "react";
import ReactiveForm from "@/components/form/ReactiveForm";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { CircularProgress } from "@mui/material";
import ReactiveField from "@/components/form/ReactiveField";
import { emailValidationSchema } from "../validation";
import { MicrosoftIcon } from "@/components/icons/MicrosoftIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { Checkbox, Link } from "@nextui-org/react";

function LoginForm({ onEmailSubmit, onAzureLogin, isLoading }) {
  return (
    <div className="flex flex-col w-full gap-4">
      <ReactiveForm
        onSubmit={onEmailSubmit}
        validationSchema={emailValidationSchema}
      >
        {({ register, errors, control, touchedFields, isValid }) => (
          <div className="flex flex-col w-full gap-4">
            <ReactiveField
              isRequired
              control={control}
              errors={errors}
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
              name="email"
              register={register}
              touched={touchedFields.email}
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
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
                href="/auth/forgot-password"
                color="primary"
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
              //color="secondary"
              variant="bordered"
              onClick={onAzureLogin}
              startContent={<MicrosoftIcon />}
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
