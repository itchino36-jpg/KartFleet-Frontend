import { configurationError, forwardJson, getBackendBaseUrl, getBearerToken, unauthorizedError } from "@/api/server/proxy";

type Context = { params: Promise<{ id: string }> };

async function endpoint(request: Request, context: Context) {
  const authorization = getBearerToken(request);
  if (!authorization) return { error: unauthorizedError() };
  const apiUrl = getBackendBaseUrl();
  if (!apiUrl) return { error: configurationError() };
  const { id } = await context.params;
  return { authorization, url: `${apiUrl}/vehicle/${encodeURIComponent(id)}` };
}

export async function PUT(request: Request, context: Context) {
  const target = await endpoint(request, context);
  if ("error" in target) return target.error;
  const body: unknown = await request.json().catch(() => null);
  return forwardJson(target.url!, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: target.authorization! }, body: JSON.stringify(body) }, "No se pudo conectar con el servicio de vehículos.");
}

export async function DELETE(request: Request, context: Context) {
  const target = await endpoint(request, context);
  if ("error" in target) return target.error;
  return forwardJson(target.url!, { method: "DELETE", headers: { Authorization: target.authorization! } }, "No se pudo conectar con el servicio de vehículos.");
}
