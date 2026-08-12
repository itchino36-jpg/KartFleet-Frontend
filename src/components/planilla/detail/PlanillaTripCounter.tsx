
import type { IncomeHistoryEntry } from "@/modules/planilla/forms/OperationalIncome";

type Props = {
  entries: IncomeHistoryEntry[];
};

export default function PlanillaTripCounter({
  entries,
}: Props) {
  const yangoCount = entries.filter(
    (entry) => entry.tripSource === "yango"
  ).length;

  const indriveCount = entries.filter(
    (entry) => entry.tripSource === "indrive"
  ).length;

  const externoCount = entries.filter(
    (entry) => entry.tripSource === "externo"
  ).length;

  const totalCount =
    yangoCount +
    indriveCount +
    externoCount;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Control operativo
        </p>

        <h3 className="mt-1 text-xl font-semibold text-slate-950">
          Control de carreras
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Cantidad de carreras registradas según su origen.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                Yango
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                InDrive
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                Externo
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="px-4 py-5 text-2xl font-bold tabular-nums text-slate-950">
                {yangoCount}
              </td>

              <td className="px-4 py-5 text-2xl font-bold tabular-nums text-slate-950">
                {indriveCount}
              </td>

              <td className="px-4 py-5 text-2xl font-bold tabular-nums text-slate-950">
                {externoCount}
              </td>

              <td className="px-4 py-5 text-2xl font-bold tabular-nums text-slate-950">
                {totalCount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
