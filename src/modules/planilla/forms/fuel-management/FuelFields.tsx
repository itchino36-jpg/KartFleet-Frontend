import type { Dispatch, SetStateAction } from "react";

type FuelFieldsProps = {
  fuelStart: string;
  setFuelStart: Dispatch<SetStateAction<string>>;
  fuelEnd: string;
  setFuelEnd: Dispatch<SetStateAction<string>>;
  odometerStart: string;
  setOdometerStart: Dispatch<SetStateAction<string>>;
  odometerEnd: string;
  setOdometerEnd: Dispatch<SetStateAction<string>>;
  observations: string;
  setObservations: Dispatch<SetStateAction<string>>;
  onSave: () => void;
};

const inputClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5";

export default function FuelFields({
  fuelStart,
  setFuelStart,
  fuelEnd,
  setFuelEnd,
  odometerStart,
  setOdometerStart,
  odometerEnd,
  setOdometerEnd,
  observations,
  setObservations,
  onSave,
}: FuelFieldsProps) {
  const fields = [
    ["Nivel inicio", fuelStart, setFuelStart],
    ["Nivel fin", fuelEnd, setFuelEnd],
    ["Kilometraje inicio", odometerStart, setOdometerStart],
    ["Kilometraje fin", odometerEnd, setOdometerEnd],
  ] as const;

  return (
    <form className="grid gap-4 sm:grid-cols-2">
      {fields.map(([label, value, setValue]) => (
        <label key={label} className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            {label}
          </span>
          <input
            type="number"
            min={0}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={inputClassName}
          />
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
