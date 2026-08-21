import { NextResponse } from "next/server";
import { configurationError, forwardJson, getBackendBaseUrl, getBearerToken, unauthorizedError } from "@/api/server/proxy";

export async function GET(request: Request) {
  const authorization = getBearerToken(request); const apiUrl = getBackendBaseUrl();
  if (!authorization) return unauthorizedError(); if (!apiUrl) return configurationError();
  if (new URL(request.url).searchParams.get("catalogs") !== "1") return forwardJson(`${apiUrl}/contract`, { headers: { Authorization: authorization } }, "No se pudo conectar con el servicio de contratos.");
  try {
    const headers = { Authorization: authorization };
    const [typesResponse, statusesResponse] = await Promise.all([fetch(`${apiUrl}/catalog/contract-type`, { headers, cache: "no-store" }), fetch(`${apiUrl}/catalog/contract-status`, { headers, cache: "no-store" })]);
    if (!typesResponse.ok || !statusesResponse.ok) return NextResponse.json({ message: `No se pudieron cargar los catálogos de contratos (${typesResponse.status}/${statusesResponse.status}).` }, { status: 502 });
    const [typesPayload, statusesPayload] = await Promise.all([typesResponse.json(), statusesResponse.json()]);
    const list = (payload: unknown) => payload && typeof payload === "object" && "data" in payload ? (payload as { data: unknown }).data : payload;
    const types = (Array.isArray(list(typesPayload)) ? list(typesPayload) as Record<string, unknown>[] : []).filter((item) => item.isActive !== false).map((item) => ({ id: String(item.catalogContractTypeId), code: String(item.code), name: String(item.name), allowsPurchase: item.allowsPurchase === true }));
    const statuses = (Array.isArray(list(statusesPayload)) ? list(statusesPayload) as Record<string, unknown>[] : []).filter((item) => item.isActive !== false).map((item) => ({ id: String(item.catalogContractStatusId), code: String(item.code), name: String(item.name) }));
    return NextResponse.json({ types, statuses });
  } catch { return NextResponse.json({ message: "No se pudo conectar con los catálogos de contratos." }, { status: 502 }); }
}

export async function POST(request: Request) { const authorization = getBearerToken(request); const apiUrl = getBackendBaseUrl(); if (!authorization) return unauthorizedError(); if (!apiUrl) return configurationError(); const body: unknown = await request.json().catch(() => null); return forwardJson(`${apiUrl}/contract`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: authorization }, body: JSON.stringify(body) }, "No se pudo conectar con el servicio de contratos."); }
