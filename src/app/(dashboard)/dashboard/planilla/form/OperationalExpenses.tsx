"use client";

import { useState } from "react";

export default function OperatingExpenses() {
  const [expenseType, setExpenseType] = useState("Combustible");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [observations, setObservations] = useState("");

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Karfleet · Planillas operativas</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Egresos operativos</h1>
        <p className="mt-1 text-sm text-slate-500">Controla los gastos asociados a la operación.</p>
      </div>

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
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Guardar egreso
          </button>
        </div>
      </form>
    </div>
  );
}