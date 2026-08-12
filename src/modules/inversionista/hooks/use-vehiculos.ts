"use client";

import { useEffect, useState } from "react";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";

const STORAGE_KEY = "vehiculos";

export function useVehiculos() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setVehiculos(JSON.parse(saved));
      } catch {
        setVehiculos([]);
      }
    }

    setIsLoading(false);
  }, []);

  const saveVehiculos = (updated: Vehiculo[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setVehiculos(updated);
  };

  const addVehiculo = (vehiculo: Vehiculo) => {
    saveVehiculos([...vehiculos, vehiculo]);
  };

  const updateVehiculo = (vehiculoActualizado: Vehiculo) => {
    const updated = vehiculos.map((vehiculo) =>
      vehiculo.id === vehiculoActualizado.id
        ? vehiculoActualizado
        : vehiculo
    );

    saveVehiculos(updated);
  };

  const deleteVehiculo = (id: string) => {
    const updated = vehiculos.filter(
      (vehiculo) => vehiculo.id !== id
    );

    saveVehiculos(updated);
  };

  return {
    vehiculos,
    isLoading,
    addVehiculo,
    updateVehiculo,
    deleteVehiculo,
  };
}