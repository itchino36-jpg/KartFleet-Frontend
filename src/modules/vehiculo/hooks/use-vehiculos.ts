"use client";

import { useCallback, useEffect, useState } from "react";
import type { Vehiculo } from "@/modules/vehiculo/types/vehiculo.types";
import { createVehicle, getVehicleCatalogs, getVehicles } from "@/api/client/vehicle.api";

const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function useVehiculos() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [items, catalogs] = await Promise.all([getVehicles(), getVehicleCatalogs()]);
    setVehiculos(items.map((item) => {
      const model = catalogs.models.find((candidate) => candidate.modelId === item.modelId);
      const type = catalogs.types.find((candidate) => candidate.typeVehicleId === item.typeVehicleId);
      return {
        id: item.vehicleId,
        inversionistaId: "",
        placa: item.plate,
        marca: model?.brand.name ?? "—",
        modelo: model?.name ?? item.model?.name ?? "—",
        tipo: type?.name ?? item.typeVehicle?.name ?? "—",
      };
    }));
  }, []);

  useEffect(() => {
    let active = true;
    localStorage.removeItem("vehiculos");
    queueMicrotask(() => {
      load()
        .catch((cause) => {
          if (active) setError(cause instanceof Error ? cause.message : "No se pudieron cargar los vehículos.");
        })
        .finally(() => {
          if (active) setIsLoading(false);
        });
    });
    return () => { active = false; };
  }, [load]);

  const addVehiculo = async (vehicle: Omit<Vehiculo, "id">) => {
    const catalogs = await getVehicleCatalogs();
    const requestedType = normalize(vehicle.tipo) === "auto" ? "automovil" : normalize(vehicle.tipo);
    const type = catalogs.types.find((item) => normalize(item.name) === requestedType);
    const model = catalogs.models.find((item) => normalize(item.name) === normalize(vehicle.modelo));
    if (!type || !model) throw new Error("El tipo o modelo seleccionado no existe en el backend.");
    await createVehicle({
      plate: vehicle.placa.trim().toUpperCase(),
      typeVehicleId: type.typeVehicleId,
      modelId: model.modelId,
      state: 1,
      isExternal: false,
    });
    await load();
  };

  const updateVehiculo = (id: string, data: Omit<Vehiculo, "id">) => {
    const updated = { id, ...data };
    setVehiculos((current) => current.map((item) => item.id === id ? updated : item));
    return updated;
  };

  const deleteVehiculo = (id: string) => {
    setVehiculos((current) => current.filter((item) => item.id !== id));
    return true;
  };

  return { vehiculos, isLoading, error, addVehiculo, updateVehiculo, deleteVehiculo };
}
