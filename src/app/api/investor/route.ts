import { configurationError, forwardJson, getBackendBaseUrl, getBearerToken, unauthorizedError } from "@/api/server/proxy";

export async function GET(request: Request) {
  const authorization = getBearerToken(request);
  if (!authorization) return unauthorizedError();
  const apiUrl = getBackendBaseUrl();
  if (!apiUrl) return configurationError();
  return forwardJson(
    `${apiUrl}/investor`,
    { headers: { Authorization: authorization } },
    "No se pudo conectar con el servicio de inversionistas."
  );
}

export async function POST(request: Request) {
  const authorization = getBearerToken(request);
  if (!authorization) return unauthorizedError();
  const apiUrl = getBackendBaseUrl();
  if (!apiUrl) return configurationError();
  const body: unknown = await request.json().catch(() => null);
  return forwardJson(
    `${apiUrl}/investor`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: authorization },
      body: JSON.stringify(body),
    },
    "No se pudo conectar con el servicio de inversionistas."
  );
}
