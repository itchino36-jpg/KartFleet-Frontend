export type GasLevel = "R" | "1" | "2" | "3" | "4";

type GasLevelSelectorProps = {
  label: string;
  value: GasLevel;
  onChange: (value: GasLevel) => void;
};

const LEVELS: GasLevel[] = ["R", "1", "2", "3", "4"];

export default function GasLevelSelector({ label, value, onChange }: GasLevelSelectorProps) {
  return (
    <fieldset className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <legend className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </legend>
      <div className="mt-2 grid grid-cols-5 gap-2">
        {LEVELS.map((level) => {
          const selected = value === level;
          return (
            <button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              aria-pressed={selected}
              aria-label={level === "R" ? `${label}: reserva` : `${label}: nivel ${level}`}
              className={`flex aspect-square items-center justify-center rounded-xl border text-sm font-bold transition ${
                selected
                  ? level === "R"
                    ? "border-red-600 bg-red-600 text-white shadow-sm"
                    : "border-slate-950 bg-slate-950 text-white shadow-sm"
                  : level === "R"
                    ? "border-red-200 bg-red-50 text-red-700 hover:border-red-400"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400"
              }`}
            >
              {level}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-500">
        <span>Reserva</span><span>Lleno</span>
      </div>
    </fieldset>
  );
}
