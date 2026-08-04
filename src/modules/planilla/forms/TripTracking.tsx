
"use client";

import { AlertCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

type TripHistoryEntry = {
  id: string;
  includedTrips: number;
  excludedTrips: number;
  objective: string;
  createdAt: string;
};

export default function TripTracking({ showForm = true, onAdd }: { showForm?: boolean; onAdd?: () => void }) {
  const [includedTrips, setIncludedTrips] = useState(0);
  const [excludedTrips, setExcludedTrips] = useState(0);
  const [objective, setObjective] = useState("");
  const [history, setHistory] = useState<TripHistoryEntry[]>([]);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const historyPanel = (
    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Historial de control de carreras</h2>
          <p className="text-sm text-slate-500">Puedes editar cualquiera de los registros ya guardados.</p>
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
        <div className="p-4 sm:p-5">
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-500">
            Aún no hay carreras registradas en este bloque.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[780px]">
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead className="text-slate-700">Fecha</TableHead>
                <TableHead className="text-slate-700">Incluidas</TableHead>
                <TableHead className="text-slate-700">No incluidas</TableHead>
                <TableHead className="text-slate-700">Total</TableHead>
                <TableHead className="text-slate-700">Objetivo / meta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.id} className="align-top">
                  <TableCell className="text-xs font-semibold text-slate-600">{entry.createdAt}</TableCell>
                  <TableCell>
                    <input
                      type="number"
                      min={0}
                      value={entry.includedTrips}
                      onChange={(event) => updateHistoryEntry(entry.id, "includedTrips", Number(event.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      min={0}
                      value={entry.excludedTrips}
                      onChange={(event) => updateHistoryEntry(entry.id, "excludedTrips", Number(event.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  </TableCell>
                  <TableCell className="tabular-nums font-semibold text-slate-900">
                    {entry.includedTrips + entry.excludedTrips}
                  </TableCell>
                  <TableCell>
                    <textarea
                      rows={3}
                      value={entry.objective}
                      onChange={(event) => updateHistoryEntry(entry.id, "objective", event.target.value)}
                      className="min-w-[220px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );

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

    setHistory((current) => [
      {
        id: crypto.randomUUID(),
        includedTrips,
        excludedTrips,
        objective,
        createdAt,
      },
      ...current,
    ]);

    setIncludedTrips(0);
    setExcludedTrips(0);
    setObjective("");
  };

  const updateHistoryEntry = (id: string, field: keyof TripHistoryEntry, value: string | number) => {
    setHistory((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
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

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Historial de control de carreras</h2>
            <p className="text-sm text-slate-500">Puedes editar cualquiera de los registros ya guardados.</p>
          </div>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {history.length} {history.length === 1 ? "registro" : "registros"}
          </span>
        </div>

        {history.length === 0 ? (
          <div className="p-4 sm:p-5">
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-500">
              Aún no hay carreras registradas en este bloque.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[780px]">
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="text-slate-700">Fecha</TableHead>
                  <TableHead className="text-slate-700">Incluidas</TableHead>
                  <TableHead className="text-slate-700">No incluidas</TableHead>
                  <TableHead className="text-slate-700">Total</TableHead>
                  <TableHead className="text-slate-700">Objetivo / meta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((entry) => (
                  <TableRow key={entry.id} className="align-top">
                    <TableCell className="text-xs font-semibold text-slate-600">{entry.createdAt}</TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min={0}
                        value={entry.includedTrips}
                        onChange={(event) => updateHistoryEntry(entry.id, "includedTrips", Number(event.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min={0}
                        value={entry.excludedTrips}
                        onChange={(event) => updateHistoryEntry(entry.id, "excludedTrips", Number(event.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                      />
                    </TableCell>
                    <TableCell className="tabular-nums font-semibold text-slate-900">
                      {entry.includedTrips + entry.excludedTrips}
                    </TableCell>
                    <TableCell>
                      <textarea
                        rows={3}
                        value={entry.objective}
                        onChange={(event) => updateHistoryEntry(entry.id, "objective", event.target.value)}
                        className="min-w-[220px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}