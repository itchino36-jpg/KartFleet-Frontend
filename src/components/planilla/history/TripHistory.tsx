"use client";

type TripHistoryEntry = {
  id: string;
  includedTrips: number;
  excludedTrips: number;
  objective: string;
  createdAt: string;
};

type Props = {
  entries: TripHistoryEntry[];
};

export default function TripHistory({
  entries,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Registros de carreras
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Historial de carreras registradas.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-slate-500">
            No existen registros de carreras.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="px-4 py-3 font-semibold">
                  Fecha
                </th>

                <th className="px-4 py-3 font-semibold">
                  Incluidas
                </th>

                <th className="px-4 py-3 font-semibold">
                  No incluidas
                </th>

                <th className="px-4 py-3 font-semibold">
                  Total
                </th>

                <th className="px-4 py-3 font-semibold">
                  Objetivo
                </th>
              </tr>
            </thead>

            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-slate-100"
                >
                  <td className="px-4 py-3">
                    {entry.createdAt}
                  </td>

                  <td className="px-4 py-3">
                    {entry.includedTrips}
                  </td>

                  <td className="px-4 py-3">
                    {entry.excludedTrips}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    {entry.includedTrips +
                      entry.excludedTrips}
                  </td>

                  <td className="px-4 py-3">
                    {entry.objective}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
