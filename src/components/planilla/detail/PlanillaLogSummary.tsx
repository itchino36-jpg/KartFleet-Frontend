import { Route } from "lucide-react";

interface PlanillaLogSummaryProps {
  items: string[];
}

export default function PlanillaLogSummary({
  items,
}: PlanillaLogSummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex items-center gap-2">

        <Route className="h-4 w-4 text-slate-950" />

        <h2 className="text-lg font-semibold text-slate-950">
          Bitácora del recorrido
        </h2>

      </div>


      <div className="mt-4 space-y-3">

        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}