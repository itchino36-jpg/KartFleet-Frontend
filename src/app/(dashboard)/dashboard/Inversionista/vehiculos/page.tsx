"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

import { useVehiculos } from "@/modules/inversionista/hooks/use-vehiculos";

import { VehiculoTable } from "@/components/inversionista/vehiculo/VehiculoTable";
import VehiculoModal from "@/components/vehiculos/VehiculoModal";
import { VehiculoHeader } from "@/components/inversionista/vehiculo/VehiculoHeader";
import { toast } from "@/components/ui/toast";

export default function VehiculosPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inversionistas, setInversionistas] = useState<Inversionista[]>([]);

  const {
    vehiculos,
    addVehiculo,
    deleteVehiculo,
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
      <VehiculoHeader onAdd={() => setIsModalOpen(true)} />

      {/* TABLA */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <VehiculoTable
          vehiculos={vehiculos}
          inversionistas={inversionistas}
          onEdit={(vehiculo) => {
            router.push(
              `/dashboard/Inversionista/vehiculos/${vehiculo.id}/edit`
            );
          }}
          onDelete={deleteVehiculo}
        />
      </section>

      {/* MODAL */}
      <VehiculoModal
        isOpen={isModalOpen}
        inversionistas={inversionistas}
        onClose={() => setIsModalOpen(false)}
        onSave={(vehiculo) => {
            const plateExists = vehiculos.some(
              (item) =>
                item.placa.trim().toUpperCase() ===
                vehiculo.placa.trim().toUpperCase()
            );

            if (plateExists) {
              toast.error("Ya existe un vehículo registrado con esa placa");
              return;
            }

            addVehiculo(vehiculo);
            setIsModalOpen(false);
        }}
        />
    </div>
  );
}
