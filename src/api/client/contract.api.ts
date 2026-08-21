import { authenticatedRequest } from "@/api/client/request";

export interface ContractTypeCatalog { id: string; code: string; name: string; allowsPurchase: boolean }
export interface ContractStatusCatalog { id: string; code: string; name: string }
export interface ContractCatalogs { types: ContractTypeCatalog[]; statuses: ContractStatusCatalog[] }
export interface BackendContract {
  contractId: string; vehicleId: string; investorId: string; contractNumber: string;
  catalogContractTypeId: string; startDate: string; endDate: string;
  monthlyAmount: string | number; purchaseAmount: string | number | null;
  catalogContractStatusId: string; notes: string | null; createdAt: string;
}
export interface ContractPayload { vehicleId: string; investorId: string; catalogContractTypeId: string; startDate: string; endDate: string; monthlyAmount: number; purchaseAmount?: number; catalogContractStatusId: string; notes?: string }
const unwrap = <T>(payload: T[] | { data: T[] }) => Array.isArray(payload) ? payload : payload.data;
const unwrapOne = <T>(payload: T | { data: T }) => payload && typeof payload === "object" && "data" in payload ? payload.data : payload;
export async function getContracts() { return unwrap(await authenticatedRequest<BackendContract[] | { data: BackendContract[] }>("/api/contract", { cache: "no-store" }, "No se pudieron cargar los contratos.")); }
export async function createContract(data: ContractPayload) { return unwrapOne(await authenticatedRequest<BackendContract | { data: BackendContract }>("/api/contract", { method: "POST", body: JSON.stringify(data) }, "No se pudo registrar el contrato.")); }
export async function updateContract(id: string, data: ContractPayload) { return unwrapOne(await authenticatedRequest<BackendContract | { data: BackendContract }>(`/api/contract/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(data) }, "No se pudo actualizar el contrato.")); }
export function getContractCatalogs() { return authenticatedRequest<ContractCatalogs>("/api/contract?catalogs=1", { cache: "no-store" }, "No se pudieron cargar los catálogos de contratos."); }
