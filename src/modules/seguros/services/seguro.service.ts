import type { Seguro, SeguroFormData } from "@/modules/seguros/types/seguro.types";

const STORAGE_KEY = "seguros";

export function getSeguros(): Seguro[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved) as Seguro[];
  } catch {
    return [];
  }
}

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
