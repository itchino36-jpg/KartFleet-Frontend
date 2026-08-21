import { NextResponse } from "next/server";

export function getBackendBaseUrl() {
  return (process.env.KARFLEET_API_URL ?? process.env.NEXT_PUBLIC_KARFLEET_API_URL)?.replace(/\/$/, "") ?? null;
}

export function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  return authorization?.startsWith("Bearer ") ? authorization : null;
}

export function configurationError() {
  return NextResponse.json({ message: "La API de KarFleet no está configurada." }, { status: 500 });
}

export function unauthorizedError() {
  return NextResponse.json({ message: "La sesión no es válida." }, { status: 401 });
}

export async function forwardJson(url: string, init: RequestInit, connectionError: string) {
  try {
    const response = await fetch(url, { ...init, cache: "no-store" });
    if (response.status === 204) return new NextResponse(null, { status: 204 });
    const payload: unknown = await response.json().catch(() => ({ message: "El backend devolvió una respuesta inválida." }));
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json({ message: connectionError }, { status: 502 });
  }
}
