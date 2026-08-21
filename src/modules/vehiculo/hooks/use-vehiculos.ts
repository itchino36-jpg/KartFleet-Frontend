"use client";

import { useCallback, useEffect, useState } from "react";
import type { Vehiculo } from "@/modules/vehiculo/types/vehiculo.types";
import { createVehicle, deleteVehicle, getVehicleCatalogs, getVehicles, updateVehicle } from "@/api/client/vehicle.api";
import { getVehicleInvestor, removeVehicleInvestor, setVehicleInvestor } from "@/modules/vehiculo/services/vehicle-investor.service";

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
        inversionistaId: item.investorId ?? item.investor?.investorId ?? getVehicleInvestor(item.vehicleId),
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
    const created = await createVehicle({
      plate: vehicle.placa.trim().toUpperCase(),
      typeVehicleId: type.typeVehicleId,
      modelId: model.modelId,
      state: 1,
      isExternal: false,
    });
    setVehicleInvestor(created.vehicleId, vehicle.inversionistaId);
    await load();
  };

  const updateVehiculo = async (id: string, data: Omit<Vehiculo, "id">) => {
    const catalogs = await getVehicleCatalogs();
    const requestedType = normalize(data.tipo) === "auto" ? "automovil" : normalize(data.tipo);
    const type = catalogs.types.find((item) => normalize(item.name) === requestedType);
    const model = catalogs.models.find((item) => normalize(item.name) === normalize(data.modelo));
    if (!type || !model) throw new Error("El tipo o modelo seleccionado no existe en el backend.");
    await updateVehicle(id, { plate: data.placa.trim().toUpperCase(), typeVehicleId: type.typeVehicleId, modelId: model.modelId, state: 1, isExternal: false });
    setVehicleInvestor(id, data.inversionistaId);
    await load();
  };

  const deleteVehiculo = async (id: string) => {
    await deleteVehicle(id);
    removeVehicleInvestor(id);
    setVehiculos((current) => current.filter((item) => item.id !== id));
  };

  return { vehiculos, isLoading, error, addVehiculo, updateVehiculo, deleteVehiculo };
}
