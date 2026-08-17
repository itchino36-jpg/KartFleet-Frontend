"use client";

import { useEffect, useState } from "react";

import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

import { useVehiculos } from "@/modules/inversionista/hooks/use-vehiculos";

import { VehiculoTable } from "@/components/inversionista/vehiculo/VehiculoTable";
import VehiculoModal from "@/components/vehiculos/VehiculoModal";
import { VehiculoHeader } from "@/components/inversionista/vehiculo/VehiculoHeader";
import { toast } from "@/components/ui/toast";
import { DeleteVehiculoConfirmation } from "@/components/vehiculos/DeleteVehiculoConfirmation";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";

export default function VehiculosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehiculoAEditar, setVehiculoAEditar] = useState<Vehiculo | null>(null);
  const [vehiculoAEliminar, setVehiculoAEliminar] = useState<Vehiculo | null>(null);

  const [inversionistas, setInversionistas] = useState<Inversionista[]>([]);

  const {
    vehiculos,
    addVehiculo,
    deleteVehiculo,
    updateVehiculo,
  } = useVehiculos();

  /*
   * Cargar inversionistas desde localStorage
   */
  useEffect(() => {
    const savedInversionistas =
      localStorage.getItem("inversionistas");

    if (!savedInversionistas) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInversionistas([]);
      return;
    }

    try {
      const parsedInversionistas: Inversionista[] =
        JSON.parse(savedInversionistas);

      setInversionistas(parsedInversionistas);
    } catch {
      setInversionistas([]);
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* ENCABEZADO */}
      <VehiculoHeader onAdd={() => {
        setVehiculoAEditar(null);
        setIsModalOpen(true);
      }} />

      {/* TABLA */}
      <VehiculoTable
          vehiculos={vehiculos}
          inversionistas={inversionistas}
          onEdit={(vehiculo) => {
            setVehiculoAEditar(vehiculo);
            setIsModalOpen(true);
          }}
          onDelete={(id) =>
            setVehiculoAEliminar(
              vehiculos.find((vehiculo) => vehiculo.id === id) ?? null
            )
          }
      />

      {/* MODAL */}
      <VehiculoModal
        key={vehiculoAEditar?.id ?? "nuevo-vehiculo"}
        isOpen={isModalOpen}
        inversionistas={inversionistas}
        vehiculoInicial={vehiculoAEditar ?? undefined}
        onClose={() => {
          setIsModalOpen(false);
          setVehiculoAEditar(null);
        }}
        onSave={(vehiculo) => {
            const plateExists = vehiculos.some(
              (item) =>
                item.id !== vehiculoAEditar?.id &&
                item.placa.trim().toUpperCase() ===
                vehiculo.placa.trim().toUpperCase()
            );

            if (plateExists) {
              toast.error("Ya existe un vehículo registrado con esa placa");
              return;
            }

            if (vehiculoAEditar) {
              updateVehiculo(vehiculoAEditar.id, vehiculo);
              toast.success("Vehículo actualizado correctamente");
            } else {
              addVehiculo(vehiculo);
              toast.success("Vehículo registrado correctamente");
            }
            setIsModalOpen(false);
            setVehiculoAEditar(null);
        }}
        />

      <DeleteVehiculoConfirmation
        key={vehiculoAEliminar?.id ?? "sin-vehiculo"}
        vehiculo={vehiculoAEliminar}
        inversionista={inversionistas.find(
          (inversionista) => inversionista.id === vehiculoAEliminar?.inversionistaId
        )}
        onCancel={() => setVehiculoAEliminar(null)}
        onConfirm={() => {
          if (!vehiculoAEliminar) return;
          deleteVehiculo(vehiculoAEliminar.id);
          setVehiculoAEliminar(null);
          toast.success("Vehículo eliminado correctamente");
        }}
      />
    </div>
  );
}
