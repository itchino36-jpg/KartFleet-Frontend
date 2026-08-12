
"use client";

import { AlertCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export type FuelHistoryEntry = {
  id: string;
  fuelStart: string;
  fuelEnd: string;
  odometerStart: string;
  odometerEnd: string;
  observations: string;
  createdAt: string;
};

type FuelManagementProps = {
  onSaved?: (entry: FuelHistoryEntry) => void;
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
    <div
      className={`relative flex flex-col items-center ${className}`}
      style={{ width: size }}
    >
      <svg
        width={size}
        height={size / 2 + strokeWidth}
        viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}
      >
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

      <div
        className="absolute flex flex-col items-center"
        style={{
          top: size / 2 - strokeWidth * 1.4,
        }}
      >
        <span className="text-3xl font-semibold tabular-nums text-white">
          {Math.round(clamped)}%
        </span>
      </div>
    </div>
  );
}

export default function FuelManagement({
  onSaved,
}: FuelManagementProps) {
  const [fuelStart, setFuelStart] = useState("");
  const [fuelEnd, setFuelEnd] = useState("");
  const [odometerStart, setOdometerStart] = useState("");
  const [odometerEnd, setOdometerEnd] = useState("");
  const [observations, setObservations] = useState("");

  const [validationMessage, setValidationMessage] =
    useState<string | null>(null);

  const fuelProgress = useMemo(() => {
    const start = Number(fuelStart || 0);
    const end = Number(fuelEnd || 0);

    if (
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      start <= 0
    ) {
      return 0;
    }

    return Math.min(
      100,
      Math.max(0, (end / start) * 100)
    );
  }, [fuelStart, fuelEnd]);

  const handleSave = () => {
    if (
      !fuelStart.trim() ||
      !fuelEnd.trim() ||
      !odometerStart.trim() ||
      !odometerEnd.trim()
    ) {
      setValidationMessage(
        "Completa nivel de combustible y kilometrajes antes de guardar el registro."
      );
      return;
    }

    setValidationMessage(null);

    const createdAt = new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const savedEntry: FuelHistoryEntry = {
      id: crypto.randomUUID(),
      fuelStart,
      fuelEnd,
      odometerStart,
      odometerEnd,
      observations,
      createdAt,
    };

    /*
     * El formulario NO administra el historial.
     *
     * Entrega el registro guardado al componente padre
     * mediante onSaved().
     */
    onSaved?.(savedEntry);

    setFuelStart("");
    setFuelEnd("");
    setOdometerStart("");
    setOdometerEnd("");
    setObservations("");
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Karfleet · Planillas operativas
        </p>

        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Control de combustible
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Registra el consumo y el estado del combustible por recorrido.
        </p>
      </div>

      {validationMessage && (
        <Alert
          variant="destructive"
          className="mb-4 max-w-full border-rose-200 bg-rose-50 text-rose-900"
        >
          <AlertCircleIcon />

          <AlertTitle>Datos incompletos</AlertTitle>

          <AlertDescription>
            {validationMessage}
          </AlertDescription>
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
          <h2 className="text-base font-semibold text-slate-900">
            Resumen en tiempo real
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            El porcentaje representa el nivel final respecto al inicio
            ingresado en el formulario.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Inicio
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {fuelStart || "0"}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Fin
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {fuelEnd || "0"}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Rendimiento
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {Math.round(fuelProgress)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <form className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            Nivel inicio
          </span>

          <input
            type="number"
            min={0}
            value={fuelStart}
            onChange={(event) =>
              setFuelStart(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            Nivel fin
          </span>

          <input
            type="number"
            min={0}
            value={fuelEnd}
            onChange={(event) =>
              setFuelEnd(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            Kilometraje inicio
          </span>

          <input
            type="number"
            min={0}
            value={odometerStart}
            onChange={(event) =>
              setOdometerStart(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            Kilometraje fin
          </span>

          <input
            type="number"
            min={0}
            value={odometerEnd}
            onChange={(event) =>
              setOdometerEnd(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-[13px] font-medium text-slate-600">
            Observaciones
          </span>

          <textarea
            rows={3}
            value={observations}
            onChange={(event) =>
              setObservations(event.target.value)
            }
            placeholder="Detalle del consumo o incidencias"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <div className="flex justify-end sm:col-span-2">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Guardar combustible
          </button>
        </div>
      </form>
    </div>
  );
}
