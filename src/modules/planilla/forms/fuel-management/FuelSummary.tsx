import FuelLevelGauge from "./FuelLevelGauge";
import GasLevelSelector, { type GasLevel } from "./GasLevelSelector";

type FuelSummaryProps = {
  gasolineStart: number;
  gasolineEnd: number;
  setGasolineStart: (value: number) => void;
  setGasolineEnd: (value: number) => void;
  gasStart: GasLevel;
  gasEnd: GasLevel;
  setGasStart: (value: GasLevel) => void;
  setGasEnd: (value: GasLevel) => void;
  usesGas: boolean;
};

export default function FuelSummary({
  gasolineStart, gasolineEnd, setGasolineStart, setGasolineEnd,
  gasStart, gasEnd, setGasStart, setGasEnd, usesGas,
}: FuelSummaryProps) {
  return (
    <div className="mb-6 space-y-4">
      <p className="text-sm text-slate-500">Mueve cada indicador para marcar directamente el nivel observado en el vehículo.</p>
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <h2 className="mb-3 font-semibold text-slate-950">Gasolina</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <FuelLevelGauge label="Nivel de salida" value={gasolineStart} onChange={setGasolineStart} />
          <FuelLevelGauge label="Nivel de llegada" value={gasolineEnd} onChange={setGasolineEnd} />
        </div>
      </section>
      {usesGas && (
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
          <div className="mb-3">
            <h2 className="font-semibold text-slate-950">Gas</h2>
            <p className="mt-1 text-xs text-slate-500">Selecciona la marca indicada en el medidor del vehículo.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <GasLevelSelector label="Nivel de salida" value={gasStart} onChange={setGasStart} />
            <GasLevelSelector label="Nivel de llegada" value={gasEnd} onChange={setGasEnd} />
          </div>
        </section>
      )}
    </div>
  );
}
