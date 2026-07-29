"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginFormErrors, LoginFormValues } from "../types/login.types";

const initialValues: LoginFormValues = {
  email: "mario@gmail.com",
  password: "12435678",
  rememberMe: true,
};

function validate(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!values.email) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (!values.password) {
    errors.password = "Ingresa tu contraseña.";
  }

  return errors;
}

export function useLoginForm() {
  const router = useRouter();

  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);


  function handleChange<K extends keyof LoginFormValues>(
    field: K,
    value: LoginFormValues[K]
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }


  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormError(null);

    const validationErrors = validate(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;


    setIsSubmitting(true);

    try {

      // LOGIN TEMPORAL
      if (
        values.email === "mario@gmail.com" &&
        values.password === "12435678"
      ) {
        router.push("/dashboard");
        return;
      }


      throw new Error("Correo o contraseña incorrectos.");


    } catch (error) {

      setFormError(
        error instanceof Error
          ? error.message
          : "No pudimos iniciar sesión."
      );

    } finally {

      setIsSubmitting(false);

    }
  }


  return {
    values,
    errors,
    formError,
    showPassword,
    isSubmitting,
    handleChange,
    toggleShowPassword,
    handleSubmit,
  };
}