"use client";

import { useState } from "react";

export default function OperationLog() {
  const [activityTime, setActivityTime] = useState("09:00");
  const [activityDescription, setActivityDescription] = useState("");
  const [observations, setObservations] = useState("");

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Karfleet · Planillas operativas</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Bitácora operativa</h1>
        <p className="mt-1 text-sm text-slate-500">Registra las actividades realizadas durante la jornada.</p>
      </div>

      <form className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Hora actividad</span>
          <input
            type="time"
            value={activityTime}
            onChange={(event) => setActivityTime(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Descripción actividad</span>
          <textarea
            rows={4}
            value={activityDescription}
            onChange={(event) => setActivityDescription(event.target.value)}
            placeholder="Describe la actividad ejecutada"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Observaciones</span>
          <textarea
            rows={3}
            value={observations}
            onChange={(event) => setObservations(event.target.value)}
            placeholder="Comentarios adicionales"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Guardar actividad
          </button>
        </div>
      </form>
    </div>
  );
}