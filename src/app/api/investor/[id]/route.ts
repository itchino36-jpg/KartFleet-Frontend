import {
  configurationError,
  forwardJson,
  getBackendBaseUrl,
  getBearerToken,
  unauthorizedError,
} from "@/api/server/proxy";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const authorization = getBearerToken(request);
  if (!authorization) return unauthorizedError();

  const apiUrl = getBackendBaseUrl();
  if (!apiUrl) return configurationError();

  const { id } = await context.params;
  const body: unknown = await request.json().catch(() => null);

  return forwardJson(
    `${apiUrl}/investor/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify(body),
    },
    "No se pudo conectar con el servicio de inversionistas."
  );
}
