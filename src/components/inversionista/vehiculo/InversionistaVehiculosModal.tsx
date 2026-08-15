"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";

import VehiculoForm from "@/components/vehiculos/VehiculoFrom";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";

type PendingVehiculo = Omit<Vehiculo, "id">;

interface InversionistaVehiculosModalProps {
  isOpen: boolean;
  inversionista: Inversionista;
  vehiculos: PendingVehiculo[];
  onAdd: (vehiculo: PendingVehiculo) => boolean;
  onRemove: (plate: string) => void;
  onBack: () => void;
  onFinish: () => void;
}

export default function InversionistaVehiculosModal({
  isOpen,
  inversionista,
  vehiculos,
  onAdd,
  onRemove,
  onBack,
  onFinish,
}: InversionistaVehiculosModalProps) {
  const [formKey, setFormKey] = useState(0);

  if (!isOpen) {
    return null;
  }

  const handleAdd = (vehiculo: PendingVehiculo) => {
    if (onAdd(vehiculo)) {
      setFormKey((current) => current + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Paso 2 de 2
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">
              Agregar vehículos
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Debes agregar al menos un vehículo. Puedes registrar varios antes de finalizar.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            aria-label="Volver al formulario del inversionista"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {vehiculos.length > 0 && (
          <div className="border-b border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-950">
                Vehículos agregados
              </h3>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                {vehiculos.length}
              </span>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {vehiculos.map((vehiculo) => (
                <div
                  key={vehiculo.placa}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-950">
                      {vehiculo.placa}
                    </p>
                    <p className="text-sm text-slate-500">
                      {vehiculo.marca} {vehiculo.modelo} · {vehiculo.año}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(vehiculo.placa)}
                    aria-label={`Eliminar vehículo ${vehiculo.placa}`}
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <VehiculoForm
          key={formKey}
          inversionistas={[inversionista]}
          fixedInversionista={inversionista}
          onSave={handleAdd}
          onCancel={onBack}
        />

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {vehiculos.length === 0
              ? "Agrega un vehículo para habilitar la creación."
              : "Puedes agregar otro vehículo o finalizar el registro."}
          </p>

          <button
            type="button"
            onClick={onFinish}
            disabled={vehiculos.length === 0}
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Crear inversionista
          </button>
        </div>
      </div>
    </div>
  );
}
