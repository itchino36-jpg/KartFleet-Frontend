
"use client";

import { AlertCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import FuelFields from "./fuel-management/FuelFields";
import FuelSummary from "./fuel-management/FuelSummary";
import type { FuelHistoryEntry } from "./fuel-management/fuel-management.types";

export type { FuelHistoryEntry } from "./fuel-management/fuel-management.types";

type FuelManagementProps = {
  onSaved?: (entry: FuelHistoryEntry) => void;
};

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

      <FuelSummary
        fuelStart={fuelStart}
        fuelEnd={fuelEnd}
        fuelProgress={fuelProgress}
      />

      <FuelFields
        fuelStart={fuelStart}
        setFuelStart={setFuelStart}
        fuelEnd={fuelEnd}
        setFuelEnd={setFuelEnd}
        odometerStart={odometerStart}
        setOdometerStart={setOdometerStart}
        odometerEnd={odometerEnd}
        setOdometerEnd={setOdometerEnd}
        observations={observations}
        setObservations={setObservations}
        onSave={handleSave}
      />
    </div>
  );
}
