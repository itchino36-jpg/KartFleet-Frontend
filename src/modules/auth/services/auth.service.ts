import type { LoginFormValues, LoginResponse } from "@/modules/auth/types/login.types";

const SYSTEM_KEY = "ka-taller";

function getErrorMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const message = "message" in payload ? payload.message : null;
  return typeof message === "string" && message.trim() ? message : null;
}

export async function loginWithUsernameAndPassword(values: LoginFormValues): Promise<LoginResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL?.replace(/\/$/, "");
  if (!apiUrl) throw new Error("El servicio de autenticación no está configurado.");

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: values.username.trim(), password: values.password, systemKey: SYSTEM_KEY }),
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor de autenticación.");
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) throw new Error("Usuario o contraseña incorrectos.");
    throw new Error(getErrorMessage(payload) ?? "No se pudo iniciar sesión. Intenta nuevamente.");
  }
  if (!payload || typeof payload !== "object" || !("access_token" in payload) || !("user" in payload)) {
    throw new Error("El servidor devolvió una respuesta de autenticación inválida.");
  }
  return payload as LoginResponse;
}
