import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/api/server/proxy";

type LoginBody = { username?: unknown; password?: unknown };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LoginBody | null;
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ message: "El usuario y la contraseña son obligatorios." }, { status: 400 });
  }

  const apiUrl = getBackendBaseUrl();
  if (!apiUrl) {
    return NextResponse.json({ message: "El servicio de autenticación no está configurado." }, { status: 500 });
  }

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
    const payload: unknown = await response.json().catch(() => ({
      message: "El servidor de autenticación devolvió una respuesta inválida.",
    }));
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json({ message: "No se pudo conectar con el servidor de autenticación." }, { status: 502 });
  }
}
