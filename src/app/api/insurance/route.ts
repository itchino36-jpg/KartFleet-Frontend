import { NextResponse } from "next/server";
import { configurationError, forwardJson, getBackendBaseUrl, getBearerToken, unauthorizedError } from "@/api/server/proxy";

function catalogItems(payload: unknown, idKeys: string[]) {
  const source = payload && typeof payload === "object" && "data" in payload ? (payload as { data: unknown }).data : payload;
  if (!Array.isArray(source)) return [];
  return source.filter((item) => {
    const value = item as Record<string, unknown>;
    return value.isActive !== false;
  }).map((item) => {
    const value = item as Record<string, unknown>;
    const id = idKeys.map((key) => value[key]).find((candidate) => typeof candidate === "string");
    const name = [value.name, value.description, value.label].find((candidate) => typeof candidate === "string");
    return id && name ? { id, name } : null;
  }).filter(Boolean);
}

export async function GET(request: Request) {
  const authorization = getBearerToken(request); const apiUrl = getBackendBaseUrl();
  if (!authorization) return unauthorizedError(); if (!apiUrl) return configurationError();
  if (new URL(request.url).searchParams.get("catalogs") !== "1") return forwardJson(`${apiUrl}/insurance`, { headers: { Authorization: authorization } }, "No se pudo conectar con el servicio de seguros.");
  try {
    const headers = { Authorization: authorization };
    const [insurersResponse, statusesResponse] = await Promise.all([fetch(`${apiUrl}/catalog/insurer`, { headers, cache: "no-store" }), fetch(`${apiUrl}/catalog/insurance-status`, { headers, cache: "no-store" })]);
    if (!insurersResponse.ok || !statusesResponse.ok) return NextResponse.json({ message: `No se pudieron cargar los catálogos de seguros (${insurersResponse.status}/${statusesResponse.status}).` }, { status: 502 });
    const [insurers, statuses] = await Promise.all([insurersResponse.json(), statusesResponse.json()]);
    return NextResponse.json({ insurers: catalogItems(insurers, ["catalogInsurerId", "id"]), statuses: catalogItems(statuses, ["catalogInsuranceStatusId", "id"]) });
  } catch { return NextResponse.json({ message: "No se pudo conectar con los catálogos de seguros." }, { status: 502 }); }
}

export async function POST(request: Request) {
  const authorization = getBearerToken(request); const apiUrl = getBackendBaseUrl();
  if (!authorization) return unauthorizedError(); if (!apiUrl) return configurationError();
  const body: unknown = await request.json().catch(() => null);
  return forwardJson(`${apiUrl}/insurance`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: authorization }, body: JSON.stringify(body) }, "No se pudo conectar con el servicio de seguros.");
}
