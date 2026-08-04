"use client";

import { AlertCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FuelHistoryEntry = {
  id: string;
  fuelStart: string;
  fuelEnd: string;
  odometerStart: string;
  odometerEnd: string;
  observations: string;
  createdAt: string;
};

function SemicircleProgress({
  value,
  size = 220,
  strokeWidth = 16,
  className = "",
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = size / 2 - strokeWidth;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = Math.PI * radius;
  const filled = (clamped / 100) * circumference;
  const startX = cx - radius;
  const endX = cx + radius;
  const pathD = `M ${startX} ${cy} A ${radius} ${radius} 0 0 1 ${endX} ${cy}`;

  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ width: size }}>
      <svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-slate-300"
          opacity={0.35}
        />
        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-emerald-400 transition-[stroke-dasharray] duration-300 ease-out"
          strokeDasharray={`${filled} ${circumference}`}
        />
      </svg>

      <div className="absolute flex flex-col items-center" style={{ top: size / 2 - strokeWidth * 1.4 }}>
        <span className="text-3xl font-semibold tabular-nums text-white">{Math.round(clamped)}%</span>
      </div>
    </div>
  );
}

export default function FuelManagement({ showForm = true, onAdd }: { showForm?: boolean; onAdd?: () => void }) {
  const [fuelStart, setFuelStart] = useState("");
  const [fuelEnd, setFuelEnd] = useState("");
  const [odometerStart, setOdometerStart] = useState("");
  const [odometerEnd, setOdometerEnd] = useState("");
  const [observations, setObservations] = useState("");
  const [history, setHistory] = useState<FuelHistoryEntry[]>([]);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const historyPanel = (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Historial de combustible</h2>
          <p className="text-sm text-slate-500">Tus registros quedan guardados y editables.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {history.length} {history.length === 1 ? "registro" : "registros"}
          </span>
          {onAdd && (
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Agregar
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-500">
          Aún no hay combustible registrado en esta sección.
        </p>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <div key={entry.id} className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-2 text-xs text-slate-500">
                <span>{entry.createdAt}</span>
                <span className="font-semibold text-slate-700">Editable</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block space-y-1">
                  <span className="text-[13px] font-medium text-slate-600">Nivel inicio</span>
                  <input
                    type="number"
                    min={0}
                    value={entry.fuelStart}
                    onChange={(event) => updateHistoryEntry(entry.id, "fuelStart", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-[13px] font-medium text-slate-600">Nivel fin</span>
                  <input
                    type="number"
                    min={0}
                    value={entry.fuelEnd}
                    onChange={(event) => updateHistoryEntry(entry.id, "fuelEnd", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-[13px] font-medium text-slate-600">Kilometraje inicio</span>
                  <input
                    type="number"
                    min={0}
                    value={entry.odometerStart}
                    onChange={(event) => updateHistoryEntry(entry.id, "odometerStart", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-[13px] font-medium text-slate-600">Kilometraje fin</span>
                  <input
                    type="number"
                    min={0}
                    value={entry.odometerEnd}
                    onChange={(event) => updateHistoryEntry(entry.id, "odometerEnd", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                  />
                </label>
              </div>
              <label className="mt-3 block space-y-1">
                <span className="text-[13px] font-medium text-slate-600">Observaciones</span>
                <textarea
                  rows={3}
                  value={entry.observations}
                  onChange={(event) => updateHistoryEntry(entry.id, "observations", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const fuelProgress = useMemo(() => {
    const start = Number(fuelStart || 0);
    const end = Number(fuelEnd || 0);

    if (!Number.isFinite(start) || !Number.isFinite(end) || start <= 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, (end / start) * 100));
  }, [fuelStart, fuelEnd]);

  const handleSave = () => {
    if (!fuelStart.trim() || !fuelEnd.trim() || !odometerStart.trim() || !odometerEnd.trim()) {
      setValidationMessage("Completa nivel de combustible y kilometrajes antes de guardar el registro.");
      return;
    }

    setValidationMessage(null);

    const createdAt = new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    setHistory((current) => [
      {
        id: crypto.randomUUID(),
        fuelStart,
        fuelEnd,
        odometerStart,
        odometerEnd,
        observations,
        createdAt,
      },
      ...current,
    ]);

    setFuelStart("");
    setFuelEnd("");
    setOdometerStart("");
    setOdometerEnd("");
    setObservations("");
  };

  const updateHistoryEntry = (id: string, field: keyof FuelHistoryEntry, value: string) => {
    setHistory((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
  };

  if (!showForm) {
    return historyPanel;
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Karfleet · Planillas operativas</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Control de combustible</h1>
        <p className="mt-1 text-sm text-slate-500">Registra el consumo y el estado del combustible por recorrido.</p>
      </div>

      {validationMessage && (
        <Alert variant="destructive" className="mb-4 max-w-full border-rose-200 bg-rose-50 text-rose-900">
          <AlertCircleIcon />
          <AlertTitle>Datos incompletos</AlertTitle>
          <AlertDescription>{validationMessage}</AlertDescription>
        </Alert>
      )}

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
          <h2 className="text-base font-semibold text-slate-900">Resumen en tiempo real</h2>
          <p className="mt-1 text-sm text-slate-500">
            El porcentaje representa el nivel final respecto al inicio ingresado en el formulario.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Inicio</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{fuelStart || "0"}</p>
            </div>
            <div className="rounded-2xl bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Fin</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{fuelEnd || "0"}</p>
            </div>
            <div className="rounded-2xl bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Rendimiento</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{Math.round(fuelProgress)}%</p>
            </div>
          </div>
        </div>
      </div>

      <form className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Nivel inicio</span>
          <input
            type="number"
            min={0}
            value={fuelStart}
            onChange={(event) => setFuelStart(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Nivel fin</span>
          <input
            type="number"
            min={0}
            value={fuelEnd}
            onChange={(event) => setFuelEnd(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Kilometraje inicio</span>
          <input
            type="number"
            min={0}
            value={odometerStart}
            onChange={(event) => setOdometerStart(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Kilometraje fin</span>
          <input
            type="number"
            min={0}
            value={odometerEnd}
            onChange={(event) => setOdometerEnd(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-[13px] font-medium text-slate-600">Observaciones</span>
          <textarea
            rows={3}
            value={observations}
            onChange={(event) => setObservations(event.target.value)}
            placeholder="Detalle del consumo o incidencias"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <div className="sm:col-span-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Guardar combustible
          </button>
        </div>
      </form>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Historial de combustible</h2>
            <p className="text-sm text-slate-500">Tus registros quedan guardados y editables.</p>
          </div>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {history.length} {history.length === 1 ? "registro" : "registros"}
          </span>
        </div>

        {history.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-500">
            Aún no hay combustible registrado en esta sección.
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span>{entry.createdAt}</span>
                  <span className="font-semibold text-slate-700">Editable</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block space-y-1">
                    <span className="text-[13px] font-medium text-slate-600">Nivel inicio</span>
                    <input
                      type="number"
                      min={0}
                      value={entry.fuelStart}
                      onChange={(event) => updateHistoryEntry(entry.id, "fuelStart", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-[13px] font-medium text-slate-600">Nivel fin</span>
                    <input
                      type="number"
                      min={0}
                      value={entry.fuelEnd}
                      onChange={(event) => updateHistoryEntry(entry.id, "fuelEnd", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-[13px] font-medium text-slate-600">Kilometraje inicio</span>
                    <input
                      type="number"
                      min={0}
                      value={entry.odometerStart}
                      onChange={(event) => updateHistoryEntry(entry.id, "odometerStart", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-[13px] font-medium text-slate-600">Kilometraje fin</span>
                    <input
                      type="number"
                      min={0}
                      value={entry.odometerEnd}
                      onChange={(event) => updateHistoryEntry(entry.id, "odometerEnd", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  </label>
                </div>
                <label className="mt-3 block space-y-1">
                  <span className="text-[13px] font-medium text-slate-600">Observaciones</span>
                  <textarea
                    rows={3}
                    value={entry.observations}
                    onChange={(event) => updateHistoryEntry(entry.id, "observations", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}