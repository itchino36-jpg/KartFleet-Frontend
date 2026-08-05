
"use client";

import { AlertCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type TripHistoryEntry = {
  id: string;
  includedTrips: number;
  excludedTrips: number;
  objective: string;
  createdAt: string;
};

type TripTrackingProps = {
  onSaved?: (entry: TripHistoryEntry) => void;
};

export default function TripTracking({
  onSaved,
}: TripTrackingProps) {
  const [includedTrips, setIncludedTrips] = useState(0);
  const [excludedTrips, setExcludedTrips] = useState(0);
  const [objective, setObjective] = useState("");
  
  const [validationMessage, setValidationMessage] = useState<string | null>(null);


  const totalTrips = useMemo(() => includedTrips + excludedTrips, [includedTrips, excludedTrips]);

  const handleSave = () => {
    if (!objective.trim()) {
      setValidationMessage("Completa el objetivo/meta antes de guardar el control de carreras.");
      return;
    }

    setValidationMessage(null);

    const createdAt = new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const savedEntry: TripHistoryEntry = {
      id: crypto.randomUUID(),
      includedTrips,
      excludedTrips,
      objective,
      createdAt,
    };

    onSaved?.(savedEntry);

        setIncludedTrips(0);
        setExcludedTrips(0);
        setObjective("");
      };


  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Karfleet · Planillas operativas</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Control de carreras</h1>
        <p className="mt-1 text-sm text-slate-500">Registra el volumen de carreras asociadas a la planilla.</p>
      </div>

      {validationMessage && (
        <Alert variant="destructive" className="mb-4 max-w-full border-rose-200 bg-rose-50 text-rose-900">
          <AlertCircleIcon />
          <AlertTitle>Datos incompletos</AlertTitle>
          <AlertDescription>{validationMessage}</AlertDescription>
        </Alert>
      )}

      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="block space-y-1.5">
            <span className="text-[13px] font-medium text-slate-600">Carreras incluidas</span>
            <input
              type="number"
              min={0}
              value={includedTrips}
              onChange={(event) => setIncludedTrips(Number(event.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-[13px] font-medium text-slate-600">Carreras no incluidas</span>
            <input
              type="number"
              min={0}
              value={excludedTrips}
              onChange={(event) => setExcludedTrips(Number(event.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-[13px] font-medium text-slate-600">Carreras totales</span>
            <input
              type="text"
              readOnly
              value={totalTrips}
              className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-base font-semibold text-slate-900 outline-none"
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Objetivo / meta</span>
          <textarea
            rows={3}
            value={objective}
            onChange={(event) => setObjective(event.target.value)}
            placeholder="Ej. Mantener 12 carreras semanales programadas"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Guardar registro
          </button>
        </div>
      </form>
    </div>
  );
}