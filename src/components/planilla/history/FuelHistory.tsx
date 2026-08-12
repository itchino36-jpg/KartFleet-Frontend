
import type { FuelHistoryEntry } from "@/modules/planilla/forms/FuelManagement";

interface FuelHistoryProps {
  entries: FuelHistoryEntry[];
}

export default function FuelHistory({
  entries,
}: FuelHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-medium text-slate-700">
          No hay registros de combustible.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Los registros que agregues aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Historial de combustible
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Registros de combustible asociados a la operación.
            </p>
          </div>

          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {entries.length}
            {entries.length === 1 ? "registro" : "registros"}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-sm">
          <thead className="bg-white">
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left font-semibold text-slate-600">
                Fecha
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-600">
                Nivel inicio
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-600">
                Nivel fin
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-600">
                Km inicio
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-600">
                Km fin
              </th>

              <th className="px-4 py-3 text-left font-semibold text-slate-600">
                Observaciones
              </th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-4 py-4 align-top text-slate-700">
                  {entry.createdAt}
                </td>

                <td className="px-4 py-4 align-top font-semibold tabular-nums text-slate-900">
                  {entry.fuelStart}
                </td>

                <td className="px-4 py-4 align-top font-semibold tabular-nums text-slate-900">
                  {entry.fuelEnd}
                </td>

                <td className="px-4 py-4 align-top text-slate-700">
                  {entry.odometerStart}
                </td>

                <td className="px-4 py-4 align-top text-slate-700">
                  {entry.odometerEnd}
                </td>

                <td className="max-w-[260px] whitespace-normal px-4 py-4 align-top text-slate-700">
                  {entry.observations || "Sin observaciones"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
