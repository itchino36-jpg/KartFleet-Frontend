import type { LoginFormValues, LoginResponse } from "../types/login.types";

/**
 * Reemplaza esta URL/base por la de tu backend real (env var recomendado).
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function loginWithEmailAndPassword(
  values: Pick<LoginFormValues, "email" | "password">
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Credenciales incorrectas. Intenta nuevamente.");
  }

  return response.json();
}

export async function loginWithGoogle(): Promise<void> {
  // Redirige a tu endpoint OAuth (ej: NextAuth, backend propio, etc.)
  window.location.href = `${API_URL}/auth/google`;
}
