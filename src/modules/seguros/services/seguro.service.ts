import type { Seguro, SeguroFormData } from "@/modules/seguros/types/seguro.types";

const STORAGE_KEY = "seguros";

type LegacySeguro = Partial<Seguro> & { montoAsegurado?: string; costoPrima?: string; fechaVencimiento?: string };

function normalize(item: LegacySeguro): Seguro {
  return { id: item.id ?? crypto.randomUUID(), vehiculoId: item.vehiculoId ?? "", aseguradora: item.aseguradora ?? "", numeroPoliza: item.numeroPoliza ?? "", valorAsegurado: item.valorAsegurado ?? item.montoAsegurado ?? "", franquicia: item.franquicia ?? item.costoPrima ?? "", fechaInicio: item.fechaInicio ?? "", fechaFin: item.fechaFin ?? item.fechaVencimiento ?? "", observaciones: item.observaciones ?? "", modalidadPago: item.modalidadPago ?? "contado", cuotas: Array.isArray(item.cuotas) ? item.cuotas : [] };
}

export function getSeguros(): Seguro[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    return (JSON.parse(saved) as LegacySeguro[]).map(normalize);
  } catch {
    throw new Error("No se pudieron leer los seguros almacenados.");
  }
}

export function getSeguroById(id: string) { return getSeguros().find((item) => item.id === id); }
export function getSegurosByVehiculo(vehicleId: string) { return getSeguros().filter((item) => item.vehiculoId === vehicleId).sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio)); }

function persist(seguros: Seguro[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seguros));
}

export function createSeguro(data: SeguroFormData): Seguro {
  const seguro = { id: crypto.randomUUID(), ...data };
  persist([...getSeguros(), seguro]);
  return seguro;
}

export function updateSeguro(id: string, data: SeguroFormData): Seguro | null {
  const seguros = getSeguros();
  if (!seguros.some((seguro) => seguro.id === id)) return null;
  const updated = { id, ...data };
  persist(seguros.map((seguro) => (seguro.id === id ? updated : seguro)));
  return updated;
}

export function deleteSeguro(id: string): boolean {
  const seguros = getSeguros();
  const filtered = seguros.filter((seguro) => seguro.id !== id);
  if (filtered.length === seguros.length) return false;
  persist(filtered);
  return true;
}
