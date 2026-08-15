import type { Dispatch, SetStateAction } from "react";

import type { IncomeHistoryEntry } from "./operational-income.types";

type OperationalIncomeFieldsProps = {
  tripSource: IncomeHistoryEntry["tripSource"];
  setTripSource: Dispatch<
    SetStateAction<IncomeHistoryEntry["tripSource"]>
  >;
  paymentType: string;
  setPaymentType: Dispatch<SetStateAction<string>>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  observations: string;
  setObservations: Dispatch<SetStateAction<string>>;
  onSave: () => void;
};

const fieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5";

export default function OperationalIncomeFields({
  tripSource,
  setTripSource,
  paymentType,
  setPaymentType,
  amount,
  setAmount,
  observations,
  setObservations,
  onSave,
}: OperationalIncomeFieldsProps) {
  return (
    <form className="grid gap-4 sm:grid-cols-2">
      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-slate-600">
          Empresa
        </span>
        <input
          type="text"
          value="Karma"
          disabled
          className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-base font-medium text-slate-700 outline-none disabled:cursor-not-allowed"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-slate-600">
          Origen de la carrera
        </span>
        <select
          value={tripSource}
          onChange={(event) =>
            setTripSource(
              event.target.value as IncomeHistoryEntry["tripSource"]
            )
          }
          className={fieldClassName}
        >
          <option value="yango">Yango</option>
          <option value="indrive">InDrive</option>
          <option value="externo">Externo</option>
        </select>
      </label>

      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-slate-600">
          Tipo de pago
        </span>
        <select
          value={paymentType}
          onChange={(event) => setPaymentType(event.target.value)}
          className={fieldClassName}
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">QR</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
      </label>

      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-slate-600">
          Monto (Bs)
        </span>
        <input
          type="number"
          min={0}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className={fieldClassName}
        />
      </label>

      <label className="block space-y-1.5 sm:col-span-2">
        <span className="text-[13px] font-medium text-slate-600">
          Observaciones
        </span>
        <textarea
          rows={3}
          value={observations}
          onChange={(event) => setObservations(event.target.value)}
          placeholder="Detalle del cobro o comentario interno"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
        />
      </label>

      <div className="flex justify-end sm:col-span-2">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Guardar ingreso
        </button>
      </div>
    </form>
  );
}
