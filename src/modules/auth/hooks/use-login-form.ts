"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginFormErrors, LoginFormValues } from "../types/login.types";
import { DEMO_USERS, ROLE_MODULES } from "@/modules/auth/constants/authorization.constants";
import { getFirstAllowedRoute, saveSession } from "@/modules/auth/services/session.service";

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

      const demoUser = DEMO_USERS.find(
        (user) =>
          user.email.toLowerCase() === values.email.trim().toLowerCase() &&
          user.password === values.password
      );

      if (!demoUser) throw new Error("Correo o contraseña incorrectos.");

      if (ROLE_MODULES[demoUser.role].length === 0) {
        throw new Error(
          "No se puede iniciar sesión: los módulos para este rol todavía no están disponibles."
        );
      }

      const sessionUser = {
        id: demoUser.id,
        name: demoUser.name,
        initials: demoUser.initials,
        email: demoUser.email,
        role: demoUser.role,
      };
      const firstRoute = getFirstAllowedRoute(sessionUser);
      if (!firstRoute) throw new Error("No se puede iniciar sesión.");

      saveSession(sessionUser, values.rememberMe);
      router.push(firstRoute);
      return;


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
