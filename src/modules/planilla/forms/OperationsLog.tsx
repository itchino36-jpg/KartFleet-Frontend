"use client";

import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import {
Alert,
AlertDescription,
AlertTitle,
} from "@/components/ui/alert";
import OperationLogFields from "./operations-log/OperationLogFields";
import type { ActivityLogEntry } from "./operations-log/operations-log.types";

export type { ActivityLogEntry } from "./operations-log/operations-log.types";

type OperationLogProps = {
onSaved?: (entry: ActivityLogEntry) => void;
};

export default function OperationLog({
onSaved,
}: OperationLogProps) {
const [activityTime, setActivityTime] =
useState("09:00");

const [activityDescription, setActivityDescription] =
useState("");

const [observations, setObservations] =
useState("");

const [validationMessage, setValidationMessage] =
useState<string | null>(null);

const handleSave = () => {
if (
!activityTime.trim() ||
!activityDescription.trim()
) {
setValidationMessage(
"Completa la hora y la descripción de la actividad antes de guardar la bitácora."
);
return;
}


setValidationMessage(null);

const createdAt = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date());

const savedEntry: ActivityLogEntry = {
  id: crypto.randomUUID(),
  activityTime,
  activityDescription,
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

setActivityTime("09:00");
setActivityDescription("");
setObservations("");


};

return ( <div> <div className="mb-6"> <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
Karfleet · Planillas operativas </p>

    <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
      Bitácora operativa
    </h1>

    <p className="mt-1 text-sm text-slate-500">
      Registra las actividades realizadas durante la jornada.
    </p>
  </div>

  {validationMessage && (
    <Alert
      variant="destructive"
      className="mb-4 max-w-full border-rose-200 bg-rose-50 text-rose-900"
    >
      <AlertCircleIcon />

      <AlertTitle>
        Datos incompletos
      </AlertTitle>

      <AlertDescription>
        {validationMessage}
      </AlertDescription>
    </Alert>
  )}

  <OperationLogFields
    activityTime={activityTime}
    setActivityTime={setActivityTime}
    activityDescription={activityDescription}
    setActivityDescription={setActivityDescription}
    observations={observations}
    setObservations={setObservations}
    onSave={handleSave}
  />
</div>
);
}
