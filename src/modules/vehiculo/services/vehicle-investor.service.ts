const STORAGE_KEY = "vehicle-investor-relations";

function getRelations(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, string>; }
  catch { return {}; }
}

export function getVehicleInvestor(vehicleId: string) {
  return getRelations()[vehicleId] ?? "";
}

export function setVehicleInvestor(vehicleId: string, investorId: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...getRelations(), [vehicleId]: investorId }));
}

export function removeVehicleInvestor(vehicleId: string) {
  const relations = getRelations();
  delete relations[vehicleId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(relations));
}
