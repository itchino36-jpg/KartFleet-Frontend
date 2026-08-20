import { NextResponse } from "next/server";
import { configurationError, forwardJson, getBackendBaseUrl, getBearerToken, unauthorizedError } from "@/api/server/proxy";

async function fetchCatalog(url: string, headers: { Authorization: string }) {
  try {
    const response = await fetch(url, { headers, cache: "no-store" });
    if (response.ok || response.status === 401 || response.status === 403) return response;
  } catch {
    // Reintenta una vez para tolerar una caída breve del microservicio.
  }
  return fetch(url, { headers, cache: "no-store" });
}

export async function GET(request: Request) {
  const authorization = getBearerToken(request);
  const apiUrl = getBackendBaseUrl();
  if (!authorization) return unauthorizedError();
  if (!apiUrl) return configurationError();

  const headers = { Authorization: authorization };
  const wantsCatalogs = new URL(request.url).searchParams.get("catalogs") === "1";
  if (!wantsCatalogs) {
    return forwardJson(`${apiUrl}/vehicle`, { headers }, "No se pudo conectar con el servicio de vehículos.");
  }

  try {
    const [brandsResponse, modelsResponse, typesResponse] = await Promise.all([
      fetchCatalog(`${apiUrl}/brand`, headers),
      fetchCatalog(`${apiUrl}/model`, headers),
      fetchCatalog(`${apiUrl}/type-vehicle`, headers),
    ]);
    if (!brandsResponse.ok || !modelsResponse.ok || !typesResponse.ok) {
      const responses = [brandsResponse, modelsResponse, typesResponse];
      if (responses.some((response) => response.status === 401 || response.status === 403)) {
        return NextResponse.json({ message: "La sesión no está autorizada para consultar los catálogos." }, { status: 401 });
      }
      const failed = [
        !brandsResponse.ok && `marcas (${brandsResponse.status})`,
        !modelsResponse.ok && `modelos (${modelsResponse.status})`,
        !typesResponse.ok && `tipos (${typesResponse.status})`,
      ].filter(Boolean).join(", ");
      return NextResponse.json({ message: `No se pudieron cargar: ${failed}.` }, { status: 502 });
    }
    const brands = await brandsResponse.json();
    const models = await modelsResponse.json();
    const types = await typesResponse.json();
    return NextResponse.json({
      brands: brands.data ?? brands,
      models: models.data ?? models,
      types: types.data ?? types,
    });
  } catch {
    return NextResponse.json({ message: "No se pudo conectar con los catálogos de vehículos." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const authorization = getBearerToken(request);
  const apiUrl = getBackendBaseUrl();
  if (!authorization) return unauthorizedError();
  if (!apiUrl) return configurationError();
  const body: unknown = await request.json().catch(() => null);
  return forwardJson(
    `${apiUrl}/vehicle`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: authorization },
      body: JSON.stringify(body),
    },
    "No se pudo conectar con el servicio de vehículos."
  );
}
