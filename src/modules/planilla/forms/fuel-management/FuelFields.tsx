import type { Dispatch, SetStateAction } from "react";

type FuelFieldsProps = {
  odometerStart: string;
  setOdometerStart: Dispatch<SetStateAction<string>>;
  odometerEnd: string;
  setOdometerEnd: Dispatch<SetStateAction<string>>;
  observations: string;
  setObservations: Dispatch<SetStateAction<string>>;
  errors: Partial<Record<"odometerStart" | "odometerEnd", string>>;
  clearError: (field: "odometerStart" | "odometerEnd") => void;
  onSave: () => void;
};

const inputClassName = (hasError: boolean) =>
  `w-full rounded-2xl border bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
      : "border-slate-200 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
  }`;

export default function FuelFields({
  odometerStart,
  setOdometerStart,
  odometerEnd,
  setOdometerEnd,
  observations,
  setObservations,
  errors,
  clearError,
  onSave,
}: FuelFieldsProps) {
  const fields = [
    ["Kilometraje inicio", "odometerStart", odometerStart, setOdometerStart],
    ["Kilometraje fin", "odometerEnd", odometerEnd, setOdometerEnd],
  ] as const;

  return (
    <form className="grid gap-4 sm:grid-cols-2">
      {fields.map(([label, field, value, setValue]) => (
        <label key={label} className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            {label}
          </span>
          <input
            type="number"
            min={0}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              clearError(field);
            }}
            aria-invalid={Boolean(errors[field])}
            className={inputClassName(Boolean(errors[field]))}
          />
          {errors[field] && (
            <span className="block text-xs font-medium text-red-600">{errors[field]}</span>
          )}
        </label>
      ))}

      <label className="block space-y-1.5 sm:col-span-2">
        <span className="text-[13px] font-medium text-slate-600">
          Observaciones
        </span>
        <textarea
          rows={3}
          value={observations}
          onChange={(event) => setObservations(event.target.value)}
          placeholder="Detalle del consumo o incidencias"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
        />
      </label>

      <div className="flex justify-end sm:col-span-2">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Guardar combustible
        </button>
      </div>
    </form>
  );
}
