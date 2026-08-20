
"use client";

import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import FuelFields from "./fuel-management/FuelFields";
import FuelSummary from "./fuel-management/FuelSummary";
import type { FuelHistoryEntry } from "./fuel-management/fuel-management.types";
import type { GasLevel } from "./fuel-management/GasLevelSelector";

export type { FuelHistoryEntry } from "./fuel-management/fuel-management.types";

type FuelManagementProps = {
  onSaved?: (entry: FuelHistoryEntry) => void;
  vehicleType?: string;
};

export default function FuelManagement({
  onSaved,
  vehicleType = "Auto",
}: FuelManagementProps) {
  const [gasolineStart, setGasolineStart] = useState(50);
  const [gasolineEnd, setGasolineEnd] = useState(50);
  const [gasStart, setGasStart] = useState<GasLevel>("R");
  const [gasEnd, setGasEnd] = useState<GasLevel>("R");
  const [odometerStart, setOdometerStart] = useState("");
  const [odometerEnd, setOdometerEnd] = useState("");
  const [observations, setObservations] = useState("");

  const [validationMessage, setValidationMessage] =
    useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"odometerStart" | "odometerEnd", string>>>({});

  const usesGas = vehicleType.toLowerCase() !== "moto";

  const handleSave = () => {
    const errors: Partial<Record<"odometerStart" | "odometerEnd", string>> = {};
    if (!odometerStart.trim()) errors.odometerStart = "Ingresa el kilometraje inicial.";
    else if (Number(odometerStart) < 0) errors.odometerStart = "El kilometraje no puede ser negativo.";
    if (!odometerEnd.trim()) errors.odometerEnd = "Ingresa el kilometraje final.";
    else if (Number(odometerEnd) < 0) errors.odometerEnd = "El kilometraje no puede ser negativo.";
    else if (odometerStart.trim() && Number(odometerStart) > Number(odometerEnd)) {
      errors.odometerEnd = "Debe ser igual o mayor que el kilometraje inicial.";
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setValidationMessage("Revisa los campos marcados en rojo antes de guardar.");
      return;
    }

    setValidationMessage(null);

    const createdAt = new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const savedEntry: FuelHistoryEntry = {
      id: crypto.randomUUID(),
      fuelStart: String(gasolineStart),
      fuelEnd: String(gasolineEnd),
      gasStart: usesGas ? String(gasStart) : undefined,
      gasEnd: usesGas ? String(gasEnd) : undefined,
      vehicleType,
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

    setGasolineStart(50);
    setGasolineEnd(50);
    setGasStart("R");
    setGasEnd("R");
    setOdometerStart("");
    setOdometerEnd("");
    setObservations("");
    setFieldErrors({});
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
        gasolineStart={gasolineStart}
        gasolineEnd={gasolineEnd}
        setGasolineStart={setGasolineStart}
        setGasolineEnd={setGasolineEnd}
        gasStart={gasStart}
        gasEnd={gasEnd}
        setGasStart={setGasStart}
        setGasEnd={setGasEnd}
        usesGas={usesGas}
      />

      <FuelFields
        odometerStart={odometerStart}
        setOdometerStart={setOdometerStart}
        odometerEnd={odometerEnd}
        setOdometerEnd={setOdometerEnd}
        observations={observations}
        setObservations={setObservations}
        errors={fieldErrors}
        clearError={(field) => {
          setFieldErrors((current) => {
            if (!current[field]) return current;
            const next = { ...current };
            delete next[field];
            return next;
          });
          setValidationMessage(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
