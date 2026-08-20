import FuelGauge from "./FuelGauge";

type FuelLevelGaugeProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  color?: "emerald" | "sky";
};

export default function FuelLevelGauge({
  label,
  value,
  onChange,
  color = "emerald",
}: FuelLevelGaugeProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <label className="block rounded-2xl border border-slate-200 bg-white p-3 text-slate-950 shadow-sm">
      <span className="block text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      <FuelGauge fuelLevel={clamped} size={200} className="mx-auto mt-1" />
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={clamped}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={`${label}: ${clamped}%`}
        className={`mt-1 w-full cursor-pointer ${color === "sky" ? "accent-sky-500" : "accent-slate-950"}`}
      />
      <div className="mt-1 flex justify-between text-[10px] font-medium text-slate-500">
        <span>Vacío</span><span>1/2</span><span>Lleno</span>
      </div>
    </label>
  );
}
