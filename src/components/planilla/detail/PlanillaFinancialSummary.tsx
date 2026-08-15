import { CircleDollarSign } from "lucide-react";

interface PlanillaFinancialSummaryProps {
  planilla: {
    ingresos: number;
    egresos: number;
    combustible: number;
  };

  money: Intl.NumberFormat;
}

export default function PlanillaFinancialSummary({
  planilla,
  money,
}: PlanillaFinancialSummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="h-4 w-4 text-slate-950" />

          <h2 className="text-lg font-semibold text-slate-950">
            Ingresos y egresos
          </h2>
        </div>

        <div className="mt-4 space-y-3 text-sm text-slate-700">

          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
            <span>Ingresos</span>

            <span className="font-semibold text-slate-950">
              {money.format(planilla.ingresos)}
            </span>
          </div>


          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
            <span>Egresos</span>

            <span className="font-semibold text-slate-950">
              {money.format(planilla.egresos)}
            </span>
          </div>


          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
            <span>Combustible</span>

            <span className="font-semibold text-slate-950">
              {money.format(planilla.combustible)}
            </span>
          </div>

        </div>
      </div>
  );
}