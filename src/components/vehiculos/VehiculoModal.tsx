"use client";

import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";
import VehiculoForm from "./VehiculoFrom";

interface VehiculoModalProps {
  isOpen: boolean;
  inversionistas: Inversionista[];
  vehiculoInicial?: Vehiculo;
  onClose: () => void;
  onSave: (vehiculo: Omit<Vehiculo, "id">) => void;
}

export default function VehiculoModal({
  isOpen,
  inversionistas,
  vehiculoInicial,
  onClose,
  onSave,
}: VehiculoModalProps) {
  if (!isOpen) {
    return null;
  }

  const modoEdicion = Boolean(vehiculoInicial);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* CABECERA */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              {modoEdicion ? "Editar vehículo" : "Nuevo vehículo"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {modoEdicion
                ? "Modifica los datos del vehículo afiliado."
                : "Registra un vehículo afiliado a un inversionista."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        {/* FORMULARIO */}
        <VehiculoForm
          inversionistas={inversionistas}
          vehiculoInicial={vehiculoInicial}
          onSave={onSave}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}