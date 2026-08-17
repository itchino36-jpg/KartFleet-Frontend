"use client";

import { useEffect, useState } from "react";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";
import {
  getVehiculos,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "@/modules/inversionista/services/vehiculo.service";

export function useVehiculos() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedVehiculos = getVehiculos();

    setVehiculos(savedVehiculos);
    setIsLoading(false);
  }, []);

  const addVehiculo = (
    vehiculo: Omit<Vehiculo, "id">
  ) => {
    const nuevoVehiculo = createVehiculo(vehiculo);

    setVehiculos((actuales) => [
      ...actuales,
      nuevoVehiculo,
    ]);
  };

  const updateVehiculoById = (
    id: string,
    data: Omit<Vehiculo, "id">
  ) => {
    const vehiculoActualizado = updateVehiculo(id, data);

    if (!vehiculoActualizado) {
      return null;
    }

    setVehiculos((actuales) =>
      actuales.map((vehiculo) =>
        vehiculo.id === id
          ? vehiculoActualizado
          : vehiculo
      )
    );

    return vehiculoActualizado;
  };

  const removeVehiculo = (id: string) => {
    const eliminado = deleteVehiculo(id);

    if (!eliminado) {
      return false;
    }

    setVehiculos((actuales) =>
      actuales.filter(
        (vehiculo) => vehiculo.id !== id
      )
    );

    return true;
  };

  return {
    vehiculos,
    isLoading,
    addVehiculo,
    updateVehiculo: updateVehiculoById,
    deleteVehiculo: removeVehiculo,
  };
}
