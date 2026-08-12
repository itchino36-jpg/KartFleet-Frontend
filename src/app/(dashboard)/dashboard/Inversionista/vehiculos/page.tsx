"use client";

import { useEffect, useState } from "react";

import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

import { useVehiculos } from "@/modules/inversionista/hooks/use-vehiculos";

import VehiculosTable from "@/components/vehiculos/VehiculosTable";
import VehiculoModal from "@/components/vehiculos/VehiculoModal";

export default function VehiculosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inversionistas, setInversionistas] = useState<Inversionista[]>([]);

  const {
    vehiculos,
    addVehiculo,
    updateVehiculo,
    deleteVehiculo,
  } = useVehiculos();

  /*
   * Cargar inversionistas desde localStorage
   */
  useEffect(() => {
    const savedInversionistas =
      localStorage.getItem("inversionistas");

    if (!savedInversionistas) {
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
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">
              Vehículos
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Gestión de vehículos afiliados.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            + Agregar nuevo
          </button>
        </div>
      </section>

      {/* TABLA */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <VehiculosTable
          vehiculos={vehiculos}
          inversionistas={inversionistas}
          onEdit={updateVehiculo}
          onDelete={deleteVehiculo}
        />
      </section>

      {/* MODAL */}
      <VehiculoModal
        isOpen={isModalOpen}
        inversionistas={inversionistas}
        onClose={() => setIsModalOpen(false)}
        onSave={(vehiculo) => {
            addVehiculo(vehiculo);
            setIsModalOpen(false);
        }}
        />
    </div>
  );
}