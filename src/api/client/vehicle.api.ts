import { authenticatedRequest } from "@/api/client/request";

export type VehicleModel = { modelId: string; name: string; brand: { brandId: string; name: string } };
export type VehicleBrand = { brandId: string; name: string; description: string; state: number };
export type VehicleType = { typeVehicleId: string; name: string; description: string; state: number };
export type VehicleCatalogs = { brands: VehicleBrand[]; models: VehicleModel[]; types: VehicleType[] };
export type CreateVehiclePayload = {
  plate: string;
  typeVehicleId: string;
  modelId: string;
  state: number;
  isExternal: boolean;
};
export type BackendVehicle = {
  vehicleId: string;
  plate: string;
  typeVehicleId: string;
  modelId: string;
  isExternal: boolean;
  state: number;
  registrationDate: string;
  updateDate: string;
  typeVehicle?: { name: string };
  model?: { name: string };
};

export function getVehicleCatalogs() {
  return authenticatedRequest<VehicleCatalogs>("/api/vehicle?catalogs=1", {}, "No se pudieron cargar los catálogos de vehículos.");
}

export async function getVehicles(): Promise<BackendVehicle[]> {
  const payload = await authenticatedRequest<BackendVehicle[] | { data: BackendVehicle[] }>("/api/vehicle", {}, "No se pudieron cargar los vehículos.");
  return Array.isArray(payload) ? payload : payload.data;
}

export function createVehicle(payload: CreateVehiclePayload) {
  return authenticatedRequest<BackendVehicle>(
    "/api/vehicle",
    { method: "POST", body: JSON.stringify(payload) },
    "No se pudo crear el vehículo."
  );
}
