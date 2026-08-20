import { ACCESS_TOKEN_KEY } from "@/modules/auth/services/session.service";

function getApiMessage(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("message" in payload)) return null;
  return typeof payload.message === "string" ? payload.message : null;
}

export async function authenticatedRequest<T>(url: string, init: RequestInit = {}, fallbackMessage: string): Promise<T> {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(url, { ...init, headers });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401) throw new Error("Tu sesión no es válida. Inicia sesión nuevamente.");
    throw new Error(getApiMessage(payload) ?? fallbackMessage);
  }
  return payload as T;
}
