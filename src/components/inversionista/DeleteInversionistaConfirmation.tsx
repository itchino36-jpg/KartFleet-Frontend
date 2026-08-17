"use client";

import { useState } from "react";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

interface Props {
  inversionista: Inversionista | null;
  cantidadVehiculos: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteInversionistaConfirmation({
  inversionista,
  cantidadVehiculos,
  onCancel,
  onConfirm,
}: Props) {
  const [confirmacion, setConfirmacion] = useState("");
  if (!inversionista) return null;

  const tieneVehiculos = cantidadVehiculos > 0;
  const puedeEliminar =
    !tieneVehiculos || confirmacion.trim().toLowerCase() === "delete";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="eliminar-inversionista-titulo">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="eliminar-inversionista-titulo" className="text-xl font-semibold text-slate-950">
          ¿Eliminar este inversionista?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Estás por eliminar a <span className="font-semibold text-slate-950">{inversionista.nombre}</span>.
        </p>

        {tieneVehiculos && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Tiene {cantidadVehiculos} vehículo{cantidadVehiculos === 1 ? "" : "s"} asociado{cantidadVehiculos === 1 ? "" : "s"}.
            </p>
            <p className="mt-1 text-sm text-red-600">
              Los vehículos también serán eliminados. Escribe Delete para confirmar.
            </p>
            <input
              type="text"
              value={confirmacion}
              onChange={(event) => setConfirmacion(event.target.value)}
              placeholder="Delete"
              autoComplete="off"
              className="mt-3 w-full rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-semibold text-slate-950 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
            />
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Cancelar
          </button>
          <button type="button" onClick={onConfirm} disabled={!puedeEliminar} className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
