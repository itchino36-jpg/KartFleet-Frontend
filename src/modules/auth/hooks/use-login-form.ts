"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginFormErrors, LoginFormValues } from "@/modules/auth/types/login.types";
import { saveAuthenticatedSession } from "@/modules/auth/services/session.service";
import { loginWithUsernameAndPassword } from "@/api/client/auth.api";

const initialValues: LoginFormValues = { username: "", password: "" };

export function useLoginForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange<K extends keyof LoginFormValues>(field: K, value: LoginFormValues[K]) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setFormError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const nextErrors: LoginFormErrors = {};
    if (!values.username.trim()) nextErrors.username = "Ingresa tu nombre de usuario.";
    if (!values.password) nextErrors.password = "Ingresa tu contraseña.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setFormError(null);
    setIsSubmitting(true);
    try {
      const response = await loginWithUsernameAndPassword(values);
      saveAuthenticatedSession(response.access_token, response.user, response.mustChangePassword);
      if (process.env.NODE_ENV === "development") {
        console.info("Token para Swagger:", `Bearer ${response.access_token}`);
      }
      router.push("/dashboard");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "No pudimos iniciar sesión.");
      setValues((previous) => ({ ...previous, password: "" }));
    } finally {
      setIsSubmitting(false);
    }
  }

  return { values, errors, formError, showPassword, isSubmitting, handleChange, toggleShowPassword: () => setShowPassword((value) => !value), handleSubmit };
}
