import SemicircleProgress from "./SemicircleProgress";

type FuelSummaryProps = {
  fuelStart: string;
  fuelEnd: string;
  fuelProgress: number;
};

export default function FuelSummary({
  fuelStart,
  fuelEnd,
  fuelProgress,
}: FuelSummaryProps) {
  return (
    <div className="mb-6 grid gap-4 lg:grid-cols-[260px_1fr]">
      <div className="rounded-3xl bg-slate-900 p-4 text-white shadow-sm">
        <div className="flex items-center justify-center rounded-2xl bg-slate-950/40 p-2">
          <SemicircleProgress value={fuelProgress} />
        </div>

        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
          Estado de combustible
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <h2 className="text-base font-semibold text-slate-900">
          Resumen en tiempo real
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          El porcentaje representa el nivel final respecto al inicio
          ingresado en el formulario.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Inicio", fuelStart || "0"],
            ["Fin", fuelEnd || "0"],
            ["Rendimiento", `${Math.round(fuelProgress)}%`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
