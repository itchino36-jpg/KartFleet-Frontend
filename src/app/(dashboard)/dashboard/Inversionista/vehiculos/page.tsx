"use client";

import { useState } from "react";
import { useVehiculos } from "@/modules/vehiculo/hooks/use-vehiculos";
import { useInversionistas } from "@/modules/inversionista/hooks/use-inversionistas";
import { VehiculoTable } from "@/components/vehiculos/VehiculoTable";
import VehiculoModal from "@/components/vehiculos/VehiculoModal";
import { VehiculoHeader } from "@/components/vehiculos/VehiculoHeader";
import { toast } from "@/components/ui/toast";
import { DeleteVehiculoConfirmation } from "@/components/vehiculos/DeleteVehiculoConfirmation";
import type { Vehiculo } from "@/modules/vehiculo/types/vehiculo.types";
import { VehiculoExportButtons } from "@/components/vehiculos/export/VehiculoExportButtons";

export default function VehiculosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehiculoAEditar, setVehiculoAEditar] = useState<Vehiculo | null>(null);
  const [vehiculoAEliminar, setVehiculoAEliminar] = useState<Vehiculo | null>(null);
  const { vehiculos, error: vehicleError, addVehiculo, deleteVehiculo, updateVehiculo } = useVehiculos();
  const { inversionistas, error: investorError } = useInversionistas();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <VehiculoHeader
        exportActions={<VehiculoExportButtons vehiculos={vehiculos} inversionistas={inversionistas} />}
        onAdd={() => { setVehiculoAEditar(null); setIsModalOpen(true); }}
      />

      {(vehicleError || investorError) && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {vehicleError ?? investorError}
        </div>
      )}

      <VehiculoTable
        vehiculos={vehiculos}
        inversionistas={inversionistas}
        onEdit={(vehicle) => { setVehiculoAEditar(vehicle); setIsModalOpen(true); }}
        onDelete={(id) => setVehiculoAEliminar(vehiculos.find((vehicle) => vehicle.id === id) ?? null)}
      />

      <VehiculoModal
        key={vehiculoAEditar?.id ?? "nuevo-vehiculo"}
        isOpen={isModalOpen}
        inversionistas={inversionistas}
        vehiculoInicial={vehiculoAEditar ?? undefined}
        onClose={() => { setIsModalOpen(false); setVehiculoAEditar(null); }}
        onSave={async (vehicle) => {
          const plateExists = vehiculos.some((item) =>
            item.id !== vehiculoAEditar?.id && item.placa.trim().toUpperCase() === vehicle.placa.trim().toUpperCase()
          );
          if (plateExists) {
            toast.error("Ya existe un vehículo registrado con esa placa");
            return;
          }
          if (vehiculoAEditar) {
            try {
              await updateVehiculo(vehiculoAEditar.id, vehicle);
              toast.success("Vehículo actualizado correctamente");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "No se pudo actualizar el vehículo");
              return;
            }
          } else {
            try {
              await addVehiculo(vehicle);
              toast.success("Vehículo registrado correctamente en el backend");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "No se pudo registrar el vehículo");
              return;
            }
          }
          setIsModalOpen(false);
          setVehiculoAEditar(null);
        }}
      />

      <DeleteVehiculoConfirmation
        key={vehiculoAEliminar?.id ?? "sin-vehiculo"}
        vehiculo={vehiculoAEliminar}
        inversionista={inversionistas.find((item) => item.id === vehiculoAEliminar?.inversionistaId)}
        onCancel={() => setVehiculoAEliminar(null)}
        onConfirm={async () => {
          if (!vehiculoAEliminar) return;
          try {
            await deleteVehiculo(vehiculoAEliminar.id);
            setVehiculoAEliminar(null);
            toast.success("Vehículo eliminado correctamente");
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "No se pudo eliminar el vehículo");
          }
        }}
      />
    </div>
  );
}
