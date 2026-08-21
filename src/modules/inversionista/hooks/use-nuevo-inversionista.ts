"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@/components/ui/toast";
import { useInversionistas } from "@/modules/inversionista/hooks/use-inversionistas";
import { useVehiculos } from "@/modules/vehiculo/hooks/use-vehiculos";
import type { InversionistaFormData } from "@/modules/inversionista/types/inversionista.types";
import type { Vehiculo } from "@/modules/vehiculo/types/vehiculo.types";
import { normalizeInitialCapital } from "@/modules/inversionista/utils/text.utils";
import { createInvestorWithVehicles } from "@/api/client/investor.api";
import { getVehicleCatalogs } from "@/api/client/vehicle.api";
import { setVehicleInvestor } from "@/modules/vehiculo/services/vehicle-investor.service";

export type PendingVehiculo = Omit<Vehiculo, "id">;

export function useNuevoInversionista() {
  const router = useRouter();
  const { inversionistas, addInversionista } = useInversionistas();
  const { vehiculos } = useVehiculos();
  const [pendingData, setPendingData] =
    useState<InversionistaFormData | null>(null);
  const [paso, setPaso] = useState<1 | 2>(1);
  const [pendingVehiculos, setPendingVehiculos] = useState<PendingVehiculo[]>([]);
  const [vehiculoEnEdicion, setVehiculoEnEdicion] =
    useState<PendingVehiculo | null>(null);
  const [placaAEliminar, setPlacaAEliminar] = useState<string | null>(null);
  const [vehicleFormKey, setVehicleFormKey] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const pendingInversionista = useMemo(
    () => ({
      id: "pending-inversionista",
      nombre: pendingData?.nombre ?? "",
      documento: pendingData?.documento ?? "",
      telefono: pendingData?.telefono ?? "",
      correo: pendingData?.correo ?? "",
      direccion: pendingData?.direccion ?? "",
    }),
    [pendingData]
  );

  const saveInversionistaDraft = (data: InversionistaFormData) => {
    const normalizedData: InversionistaFormData = {
      nombre: normalizeInitialCapital(data.nombre.trim()),
      documento: data.documento.trim(),
      telefono: data.telefono.trim(),
      correo: data.correo.trim().toLowerCase(),
      direccion: data.direccion.trim(),
    };
    const duplicate = inversionistas.some(
      (inversionista) =>
        inversionista.documento.trim().toLowerCase() ===
          normalizedData.documento.toLowerCase() ||
        inversionista.correo.trim().toLowerCase() === normalizedData.correo ||
        inversionista.telefono.trim() === normalizedData.telefono
    );

    if (duplicate) {
      toast.error(
        "Ya existe un inversionista con el mismo documento, correo o teléfono"
      );
      return;
    }

    setPendingData(normalizedData);
    setPaso(2);
  };

  const saveVehiculoDraft = (vehiculo: PendingVehiculo) => {
    const placa = vehiculo.placa.trim().toUpperCase();
    const otrosPendientes = vehiculoEnEdicion
      ? pendingVehiculos.filter((item) => item.placa !== vehiculoEnEdicion.placa)
      : pendingVehiculos;
    const plateExists = [...vehiculos, ...otrosPendientes].some(
      (item) => item.placa.trim().toUpperCase() === placa
    );

    if (plateExists) {
      toast.error("Ya existe un vehículo registrado con esa placa");
      return;
    }

    const vehiculoNormalizado = {
      ...vehiculo,
      placa,
      marca: normalizeInitialCapital(vehiculo.marca.trim()),
      modelo: normalizeInitialCapital(vehiculo.modelo.trim()),
    };

    if (vehiculoEnEdicion) {
      setPendingVehiculos((actuales) =>
        actuales.map((item) =>
          item.placa === vehiculoEnEdicion.placa ? vehiculoNormalizado : item
        )
      );
      setVehiculoEnEdicion(null);
      toast.success("Vehículo actualizado correctamente");
    } else {
      setPendingVehiculos((actuales) => [...actuales, vehiculoNormalizado]);
      toast.success("Vehículo agregado. Puedes agregar otro o finalizar.");
    }

    setVehicleFormKey((actual) => actual + 1);
  };

  const editVehiculo = (vehiculo: PendingVehiculo) => {
    setVehiculoEnEdicion(vehiculo);
    setVehicleFormKey((actual) => actual + 1);
  };

  const cancelVehicleForm = () => {
    if (vehiculoEnEdicion) {
      setVehiculoEnEdicion(null);
      setVehicleFormKey((actual) => actual + 1);
      return;
    }
    setPaso(1);
  };

  const confirmDeleteVehiculo = () => {
    if (!placaAEliminar) return;

    setPendingVehiculos((actuales) =>
      actuales.filter((item) => item.placa !== placaAEliminar)
    );
    if (vehiculoEnEdicion?.placa === placaAEliminar) {
      setVehiculoEnEdicion(null);
      setVehicleFormKey((actual) => actual + 1);
    }
    setPlacaAEliminar(null);
    toast.success("Vehículo eliminado de la lista");
  };

  const finish = async () => {
    if (!pendingData || pendingVehiculos.length === 0) {
      toast.error("Debes agregar al menos un vehículo");
      return;
    }

    if (isSaving) return;
    setIsSaving(true);
    try {
    const catalogs = await getVehicleCatalogs();
    const normalizedVehicles = pendingVehiculos.map((vehicle) => {
      const requestedType = vehicle.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const typeName = requestedType === "auto" ? "automovil" : requestedType === "camion" ? "camion" : "moto";
      const type = catalogs.types.find((item) => item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === typeName);
      const model = catalogs.models.find((item) => item.name.trim().toLowerCase() === vehicle.modelo.trim().toLowerCase());
      if (!type) throw new Error(`El tipo ${vehicle.tipo} no existe en el backend.`);
      if (!model) throw new Error(`El modelo ${vehicle.modelo} no existe en el catálogo del backend.`);
      if (model.brand.name.trim().toLowerCase() !== vehicle.marca.trim().toLowerCase()) {
        throw new Error(`El modelo ${model.name} pertenece a la marca ${model.brand.name}.`);
      }
      return { vehicle, typeVehicleId: type.typeVehicleId, modelId: model.modelId };
    });
    const created = await createInvestorWithVehicles(
      pendingData,
      normalizedVehicles.map(({ vehicle, typeVehicleId, modelId }) => ({
        plate: vehicle.placa,
        typeVehicleId,
        modelId,
        state: 1,
        isExternal: false,
      }))
    );
    created.vehicles.forEach((vehicle) => setVehicleInvestor(vehicle.vehicleId, created.investor.investorId));
    addInversionista(
      { ...pendingData, createdAt: created.investor.createdAt },
      created.investor.investorId
    );
    toast.success("Inversionista y vehículos registrados correctamente");
    router.push("/dashboard/Inversionista");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo crear el inversionista");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    paso,
    pendingData,
    pendingInversionista,
    pendingVehiculos,
    vehiculoEnEdicion,
    placaAEliminar,
    vehicleFormKey,
    isSaving,
    saveInversionistaDraft,
    saveVehiculoDraft,
    editVehiculo,
    cancelVehicleForm,
    requestDeleteVehiculo: setPlacaAEliminar,
    cancelDeleteVehiculo: () => setPlacaAEliminar(null),
    confirmDeleteVehiculo,
    finish,
    cancel: () => router.push("/dashboard/Inversionista"),
  };
}
