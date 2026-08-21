import { authenticatedRequest } from "@/api/client/request";

export interface InsuranceCatalogItem { id: string; name: string }
export interface InsuranceCatalogs { insurers: InsuranceCatalogItem[]; statuses: InsuranceCatalogItem[] }
export interface BackendInsurance {
  insuranceId: string;
  vehicleId: string;
  catalogInsurerId: string;
  policyNumber: string;
  insuredValue: number;
  deductible: number;
  startDate: string;
  expirationDate: string;
  catalogInsuranceStatusId: string;
  catalogInsurer?: { catalogInsurerId?: string; name?: string; description?: string };
  catalogInsuranceStatus?: { catalogInsuranceStatusId?: string; name?: string; description?: string };
}
export type InsurancePayload = Omit<BackendInsurance, "insuranceId" | "catalogInsurer" | "catalogInsuranceStatus">;

function unwrap<T>(payload: T[] | { data: T[] }) { return Array.isArray(payload) ? payload : payload.data; }
export async function getInsurances() { return unwrap(await authenticatedRequest<BackendInsurance[] | { data: BackendInsurance[] }>("/api/insurance", { cache: "no-store" }, "No se pudieron cargar los seguros.")); }
export function createInsurance(payload: InsurancePayload) { return authenticatedRequest<BackendInsurance>("/api/insurance", { method: "POST", body: JSON.stringify(payload) }, "No se pudo registrar el seguro."); }
export function updateInsurance(id: string, payload: InsurancePayload) { return authenticatedRequest<BackendInsurance>(`/api/insurance/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(payload) }, "No se pudo actualizar el seguro."); }
export function getInsuranceCatalogs() { return authenticatedRequest<InsuranceCatalogs>("/api/insurance?catalogs=1", { cache: "no-store" }, "No se pudieron cargar los catálogos de seguros."); }
