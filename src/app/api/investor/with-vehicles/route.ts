import { configurationError, forwardJson, getBackendBaseUrl, getBearerToken, unauthorizedError } from "@/api/server/proxy";

export async function POST(request: Request) {
  const authorization = getBearerToken(request);
  if (!authorization) return unauthorizedError();
  const apiUrl = getBackendBaseUrl();
  if (!apiUrl) return configurationError();
  const body: unknown = await request.json().catch(() => null);
  return forwardJson(
    `${apiUrl}/investor/with-vehicles`,
    { method: "POST", headers: { "Content-Type": "application/json", Authorization: authorization }, body: JSON.stringify(body) },
    "No se pudo conectar con el servicio de inversionistas."
  );
}
