import { Fuel } from "lucide-react";

interface PlanillaFuelSummaryProps {
  planilla: {
    gasInicio: number;
    gasFin: number;
  };
}

export default function PlanillaFuelSummary({
  planilla,
}: PlanillaFuelSummaryProps) {
  const consumoEstimado =
    planilla.gasInicio - planilla.gasFin;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Fuel className="h-4 w-4 text-slate-950" />
        <h2 className="text-lg font-semibold text-slate-950">
          Combustible
        </h2>
      </div>

      <div className="mt-4 space-y-3 text-sm text-slate-700">
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <span>
            Gasolina al inicio
          </span>

          <span className="font-semibold text-slate-950">
            {planilla.gasInicio} L
          </span>
        </div>


        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <span>
            Gasolina al cierre
          </span>

          <span className="font-semibold text-slate-950">
            {planilla.gasFin} L
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <span>
            Consumo estimado
          </span>
          <span className="font-semibold text-slate-950">
            {consumoEstimado} L
          </span>
        </div>
      </div>
    </section>
  );
}