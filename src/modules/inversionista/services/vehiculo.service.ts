// src/modules/inversionista/services/vehiculo.service.ts

import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";

const STORAGE_KEY = "vehiculos";

export function getVehiculos(): Vehiculo[] {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved) as Vehiculo[];
  } catch {
    return [];
  }
}

export function getVehiculoById(id: string): Vehiculo | undefined {
  const vehiculos = getVehiculos();

  return vehiculos.find((vehiculo) => vehiculo.id === id);
}

export function createVehiculo(
  vehiculo: Omit<Vehiculo, "id">
): Vehiculo {
  const vehiculos = getVehiculos();

  const nuevoVehiculo: Vehiculo = {
    id: crypto.randomUUID(),
    ...vehiculo,
  };

  const updated = [...vehiculos, nuevoVehiculo];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return nuevoVehiculo;
}

export function updateVehiculo(
  id: string,
  data: Omit<Vehiculo, "id">
): Vehiculo | null {
  const vehiculos = getVehiculos();

  const index = vehiculos.findIndex(
    (vehiculo) => vehiculo.id === id
  );

  if (index === -1) {
    return null;
  }

  const updatedVehiculo: Vehiculo = {
    id,
    ...data,
  };

  const updated = [...vehiculos];

  updated[index] = updatedVehiculo;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return updatedVehiculo;
}

export function deleteVehiculo(id: string): boolean {
  const vehiculos = getVehiculos();

  const exists = vehiculos.some(
    (vehiculo) => vehiculo.id === id
  );

  if (!exists) {
    return false;
  }

  const updated = vehiculos.filter(
    (vehiculo) => vehiculo.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return true;
}