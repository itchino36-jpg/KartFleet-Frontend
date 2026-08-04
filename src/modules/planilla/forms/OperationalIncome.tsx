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

type IncomeHistoryEntry = {
  id: string;
  company: string;
  paymentType: string;
  amount: string;
  currency: string;
  observations: string;
  createdAt: string;
};

export default function OperationalIncome({ showForm = true, onAdd }: { showForm?: boolean; onAdd?: () => void }) {
  const [company, setCompany] = useState("");
  const [paymentType, setPaymentType] = useState("Efectivo");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [observations, setObservations] = useState("");
  const [history, setHistory] = useState<IncomeHistoryEntry[]>([]);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const historyPanel = (
    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Historial de ingresos operativos</h2>
          <p className="text-sm text-slate-500">Cada ingreso se conserva y puede corregirse.</p>
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
            Aún no hay ingresos guardados en esta sección.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[860px]">
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead className="text-slate-700">Fecha</TableHead>
                <TableHead className="text-slate-700">Empresa</TableHead>
                <TableHead className="text-slate-700">Tipo de pago</TableHead>
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
                      value={entry.company}
                      onChange={(event) => updateHistoryEntry(entry.id, "company", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    >
                      <option value="">Selecciona una empresa</option>
                      <option value="Transporte Norte">Transporte Norte</option>
                      <option value="Logística Pacífico">Logística Pacífico</option>
                      <option value="Karfleet Admin">Karfleet Admin</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <select
                      value={entry.paymentType}
                      onChange={(event) => updateHistoryEntry(entry.id, "paymentType", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    >
                      <option value="Efectivo">Efectivo</option>
                      <option value="Transferencia">Transferencia</option>
                      <option value="Tarjeta">Tarjeta</option>
                    </select>
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
    if (!company.trim() || !amount.trim()) {
      setValidationMessage("Selecciona la empresa y escribe el monto antes de guardar el ingreso operativo.");
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
        company,
        paymentType,
        amount,
        currency,
        observations,
        createdAt,
      },
      ...current,
    ]);

    setCompany("");
    setPaymentType("Efectivo");
    setAmount("");
    setCurrency("USD");
    setObservations("");
  };

  const updateHistoryEntry = (id: string, field: keyof IncomeHistoryEntry, value: string) => {
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
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Ingresos operativos</h1>
        <p className="mt-1 text-sm text-slate-500">Registra cada ingreso asociado a la operación.</p>
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
          <span className="text-[13px] font-medium text-slate-600">Empresa</span>
          <select
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          >
            <option value="">Selecciona una empresa</option>
            <option value="Transporte Norte">Transporte Norte</option>
            <option value="Logística Pacífico">Logística Pacífico</option>
            <option value="Karfleet Admin">Karfleet Admin</option>
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Tipo de pago</span>
          <select
            value={paymentType}
            onChange={(event) => setPaymentType(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta">Tarjeta</option>
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
            placeholder="Detalle del cobro o comentario interno"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <div className="sm:col-span-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Guardar ingreso
          </button>
        </div>
      </form>

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Historial de ingresos operativos</h2>
            <p className="text-sm text-slate-500">Cada ingreso se conserva y puede corregirse.</p>
          </div>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {history.length} {history.length === 1 ? "registro" : "registros"}
          </span>
        </div>

        {history.length === 0 ? (
          <div className="p-4 sm:p-5">
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-500">
              Aún no hay ingresos guardados en esta sección.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[860px]">
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="text-slate-700">Fecha</TableHead>
                  <TableHead className="text-slate-700">Empresa</TableHead>
                  <TableHead className="text-slate-700">Tipo de pago</TableHead>
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
                        value={entry.company}
                        onChange={(event) => updateHistoryEntry(entry.id, "company", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                      >
                        <option value="">Selecciona una empresa</option>
                        <option value="Transporte Norte">Transporte Norte</option>
                        <option value="Logística Pacífico">Logística Pacífico</option>
                        <option value="Karfleet Admin">Karfleet Admin</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <select
                        value={entry.paymentType}
                        onChange={(event) => updateHistoryEntry(entry.id, "paymentType", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                      >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Tarjeta">Tarjeta</option>
                      </select>
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