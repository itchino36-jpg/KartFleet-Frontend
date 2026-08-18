"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@/components/ui/toast";
import { useInversionistas } from "@/modules/inversionista/hooks/use-inversionistas";
import { useVehiculos } from "@/modules/inversionista/hooks/use-vehiculos";
import type { InversionistaFormData } from "@/modules/inversionista/types/inversionista-form.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";
import { normalizeInitialCapital } from "@/modules/inversionista/utils/text.utils";

export type PendingVehiculo = Omit<Vehiculo, "id">;

export function useNuevoInversionista() {
  const router = useRouter();
  const { inversionistas, addInversionista } = useInversionistas();
  const { vehiculos, addVehiculo } = useVehiculos();
  const [pendingData, setPendingData] =
    useState<InversionistaFormData | null>(null);
  const [paso, setPaso] = useState<1 | 2>(1);
  const [pendingVehiculos, setPendingVehiculos] = useState<PendingVehiculo[]>([]);
  const [vehiculoEnEdicion, setVehiculoEnEdicion] =
    useState<PendingVehiculo | null>(null);
  const [placaAEliminar, setPlacaAEliminar] = useState<string | null>(null);
  const [vehicleFormKey, setVehicleFormKey] = useState(0);

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
      color: normalizeInitialCapital(vehiculo.color.trim()),
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

  const finish = () => {
    if (!pendingData || pendingVehiculos.length === 0) {
      toast.error("Debes agregar al menos un vehículo");
      return;
    }

    const nuevoInversionista = addInversionista(pendingData);
    pendingVehiculos.forEach((vehiculo) =>
      addVehiculo({ ...vehiculo, inversionistaId: nuevoInversionista.id })
    );
    toast.success("Inversionista y vehículos registrados correctamente");
    router.push("/dashboard/Inversionista");
  };

  return {
    paso,
    pendingData,
    pendingInversionista,
    pendingVehiculos,
    vehiculoEnEdicion,
    placaAEliminar,
    vehicleFormKey,
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
