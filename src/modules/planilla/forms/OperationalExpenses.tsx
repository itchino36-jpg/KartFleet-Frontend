"use client";

import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

type ExpenseHistoryEntry = {
  id: string;
  expenseType: string;
  description: string;
  amount: string;
  currency: string;
  observations: string;
  createdAt: string;
};

export default function OperatingExpenses({ showForm = true, onAdd }: { showForm?: boolean; onAdd?: () => void }) {
  const [expenseType, setExpenseType] = useState("Combustible");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [observations, setObservations] = useState("");
  const [history, setHistory] = useState<ExpenseHistoryEntry[]>([]);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const historyPanel = (
    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Historial de egresos operativos</h2>
          <p className="text-sm text-slate-500">Los egresos se pueden editar directamente desde la lista.</p>
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
            Aún no hay egresos guardados en esta sección.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead className="text-slate-700">Fecha</TableHead>
                <TableHead className="text-slate-700">Tipo egreso</TableHead>
                <TableHead className="text-slate-700">Descripción</TableHead>
                <TableHead className="text-slate-700">Monto</TableHead>
                <TableHead className="text-slate-700">Moneda</TableHead>
                <TableHead className="text-slate-700">Observaciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.id} className="align-top">
                  <TableCell className="text-xs font-semibold text-slate-600">{entry.createdAt}</TableCell>
                  <TableCell>
                    <select
                      value={entry.expenseType}
                      onChange={(event) => updateHistoryEntry(entry.id, "expenseType", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    >
                      <option value="Combustible">Combustible</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Peajes">Peajes</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={entry.description}
                      onChange={(event) => updateHistoryEntry(entry.id, "description", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      min={0}
                      value={entry.amount}
                      onChange={(event) => updateHistoryEntry(entry.id, "amount", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  </TableCell>
                  <TableCell>
                    <select
                      value={entry.currency}
                      onChange={(event) => updateHistoryEntry(entry.id, "currency", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    >
                      <option value="USD">USD</option>
                      <option value="MXN">MXN</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <textarea
                      rows={3}
                      value={entry.observations}
                      onChange={(event) => updateHistoryEntry(entry.id, "observations", event.target.value)}
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

  const handleSave = () => {
    if (!description.trim() || !amount.trim()) {
      setValidationMessage("Completa la descripción y el monto antes de guardar el egreso operativo.");
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
        expenseType,
        description,
        amount,
        currency,
        observations,
        createdAt,
      },
      ...current,
    ]);

    setExpenseType("Combustible");
    setDescription("");
    setAmount("");
    setCurrency("USD");
    setObservations("");
  };

  const updateHistoryEntry = (id: string, field: keyof ExpenseHistoryEntry, value: string) => {
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
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Egresos operativos</h1>
        <p className="mt-1 text-sm text-slate-500">Controla los gastos asociados a la operación.</p>
      </div>

      {validationMessage && (
        <Alert variant="destructive" className="mb-4 max-w-full border-rose-200 bg-rose-50 text-rose-900">
          <AlertCircleIcon />
          <AlertTitle>Datos incompletos</AlertTitle>
          <AlertDescription>{validationMessage}</AlertDescription>
        </Alert>
      )}

      <form className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Tipo egreso</span>
          <select
            value={expenseType}
            onChange={(event) => setExpenseType(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          >
            <option value="Combustible">Combustible</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Peajes">Peajes</option>
            <option value="Otros">Otros</option>
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Monto</span>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-[13px] font-medium text-slate-600">Descripción adicional</span>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Detalle del egreso"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Moneda</span>
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          >
            <option value="USD">USD</option>
            <option value="MXN">MXN</option>
            <option value="EUR">EUR</option>
          </select>
        </label>

        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-[13px] font-medium text-slate-600">Observaciones</span>
          <textarea
            rows={3}
            value={observations}
            onChange={(event) => setObservations(event.target.value)}
            placeholder="Comentarios o detalle adicional"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <div className="sm:col-span-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Guardar egreso
          </button>
        </div>
      </form>

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Historial de egresos operativos</h2>
            <p className="text-sm text-slate-500">Los egresos se pueden editar directamente desde la lista.</p>
          </div>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {history.length} {history.length === 1 ? "registro" : "registros"}
          </span>
        </div>

        {history.length === 0 ? (
          <div className="p-4 sm:p-5">
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-500">
              Aún no hay egresos guardados en esta sección.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="text-slate-700">Fecha</TableHead>
                  <TableHead className="text-slate-700">Tipo egreso</TableHead>
                  <TableHead className="text-slate-700">Descripción</TableHead>
                  <TableHead className="text-slate-700">Monto</TableHead>
                  <TableHead className="text-slate-700">Moneda</TableHead>
                  <TableHead className="text-slate-700">Observaciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((entry) => (
                  <TableRow key={entry.id} className="align-top">
                    <TableCell className="text-xs font-semibold text-slate-600">{entry.createdAt}</TableCell>
                    <TableCell>
                      <select
                        value={entry.expenseType}
                        onChange={(event) => updateHistoryEntry(entry.id, "expenseType", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                      >
                        <option value="Combustible">Combustible</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                        <option value="Peajes">Peajes</option>
                        <option value="Otros">Otros</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={entry.description}
                        onChange={(event) => updateHistoryEntry(entry.id, "description", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min={0}
                        value={entry.amount}
                        onChange={(event) => updateHistoryEntry(entry.id, "amount", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                      />
                    </TableCell>
                    <TableCell>
                      <select
                        value={entry.currency}
                        onChange={(event) => updateHistoryEntry(entry.id, "currency", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                      >
                        <option value="USD">USD</option>
                        <option value="MXN">MXN</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <textarea
                        rows={3}
                        value={entry.observations}
                        onChange={(event) => updateHistoryEntry(entry.id, "observations", event.target.value)}
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