import { authenticatedRequest } from "@/api/client/request";
import type { InversionistaFormData } from "@/modules/inversionista/types/inversionista.types";

export type InvestorResponse = {
  investorId: string;
  fullName: string;
  nationalId: string;
  phone: string;
  email: string;
  address: string;
  state: number;
  createdAt: string;
  updatedAt: string;
};

export function createInversionista(data: InversionistaFormData) {
  return authenticatedRequest<InvestorResponse>(
    "/api/investor",
    {
      method: "POST",
      body: JSON.stringify({
        fullName: data.nombre.trim(),
        nationalId: data.documento.trim(),
        phone: data.telefono.trim(),
        email: data.correo.trim().toLowerCase(),
        address: data.direccion.trim(),
      }),
    },
    "No se pudo crear el inversionista."
  );
}

export function updateInversionista(id: string, data: InversionistaFormData) {
  return authenticatedRequest<InvestorResponse>(
    `/api/investor/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        fullName: data.nombre.trim(),
        nationalId: data.documento.trim(),
        phone: data.telefono.trim(),
        email: data.correo.trim().toLowerCase(),
        address: data.direccion.trim(),
      }),
    },
    "No se pudo actualizar el inversionista."
  );
}

export async function getInversionistas() {
  const payload = await authenticatedRequest<InvestorResponse[]>("/api/investor", { cache: "no-store" }, "No se pudieron cargar los inversionistas.");
  if (!Array.isArray(payload)) throw new Error("El backend devolvió una lista de inversionistas inválida.");
  return payload;
}
