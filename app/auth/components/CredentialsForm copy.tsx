"use client";

import React from "react";
import { CircularProgress } from "@mui/material";
import { Alert } from "@heroui/alert";
import { Button, Checkbox, Divider, Link } from "@heroui/react";
import { Icon } from "@iconify/react";

import { otpValidationSchema, passswordValidationSchema } from "../validation";

import ReactiveOtpField from "@/components/form/ReactiveOtpField";
import ReactiveField from "@/components/form/ReactiveField";
import ReactiveForm from "@/components/form/ReactiveForm";

function CredentialsForm({
  onSubmit,
  onResendClick,
  onGoBackClick,
  isLoading,
  authMethod,
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col w-full gap-4">
      <ReactiveForm
        validationSchema={
          authMethod === "otp" ? otpValidationSchema : passswordValidationSchema
        }
        onSubmit={onSubmit}
      >
        {({ register, errors, control, touchedFields, isValid }) => (
          <div className="flex flex-col gap-3">
            {authMethod === "otp" ? (
              <>
                <div className="col-span-12">
                  <Alert
                    hideIconWrapper
                    color="primary"
                    description={`Ingresa el código de verificación enviado por correo electrónico. Este código es válido por 5 minutos.`}
                  />
                  <div className="col-span-12 flex justify-center mt-4 mb-1 ">
                    <ReactiveOtpField
                      className="col-span-12"
                      control={control}
                      errors={errors}
                      label={"Enter OTP"}
                      name={"token"}
                      register={register}
                      size="lg"
                      touched={touchedFields.token}
                    />
                  </div>
                </div>
                <Button
                  className="w-full col-span-12"
                  variant="bordered"
                  onClick={onResendClick}
                >
                  Reenviar código
                </Button>
              </>
            ) : (
              <>
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
                <div className="flex w-full items-center justify-between px-1 py-2">
                  <Checkbox className="mr-2" name="remember" size="sm">
                    Recordarme
                  </Checkbox>
                  <Link
                    className="text-default-500"
                    href="/auth/forgot-password"
                    size="sm"
                  >
                    Olvidé mi contraseña
                  </Link>
                </div>
              </>
            )}

            <Button
              className="standard-btn w-full col-span-12"
              color="primary"
              disabled={!isValid}
              startContent={<>{isLoading && <CircularProgress size={10} />}</>}
              type="submit"
            >
              Continuar
            </Button>
            <div className="flex items-center gap-4 py-2 col-span-12">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">Ó</p>
              <Divider className="flex-1" />
            </div>
            <Button
              className=" w-full col-span-12"
              variant="bordered"
              onClick={onGoBackClick}
            >
              Volver a opciones de inicio de sesión
            </Button>
          </div>
        )}
      </ReactiveForm>
    </div>
  );
}

export default CredentialsForm;
