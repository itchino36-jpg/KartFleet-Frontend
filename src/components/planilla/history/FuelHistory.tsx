"use client";

import type { FuelHistoryEntry } from "@/modules/planilla/forms/FuelManagement";

interface FuelHistoryProps {
  entries: FuelHistoryEntry[];
}

export default function FuelHistory({
  entries,
}: FuelHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="font-semibold text-slate-950">
          No hay registros de combustible.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Los registros que agregues aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[850px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Fecha
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Gasolina salida
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Gasolina llegada
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Gas salida</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Gas llegada</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Km inicio
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Km fin
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Observaciones
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.id}
              className="border-b border-slate-100"
            >
              <td className="px-4 py-4 text-sm text-slate-700">
                {entry.createdAt}
              </td>
              <td className="px-4 py-4 text-sm font-semibold text-slate-950">
                {entry.fuelStart}%
              </td>
              <td className="px-4 py-4 text-sm font-semibold text-slate-950">
                {entry.fuelEnd}%
              </td>
              <td className="px-4 py-4 text-sm font-semibold text-slate-950">
                {entry.gasStart ?? "—"}
              </td>
              <td className="px-4 py-4 text-sm font-semibold text-slate-950">
                {entry.gasEnd ?? "—"}
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                {entry.odometerStart}
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                {entry.odometerEnd}
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                {entry.observations || "Sin observaciones"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
