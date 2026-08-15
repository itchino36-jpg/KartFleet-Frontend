import type { Dispatch, SetStateAction } from "react";

type OperationalExpenseFieldsProps = {
  expenseType: string;
  setExpenseType: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  observations: string;
  setObservations: Dispatch<SetStateAction<string>>;
  onSave: () => void;
};

const fieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5";

export default function OperationalExpenseFields({
  expenseType,
  setExpenseType,
  description,
  setDescription,
  amount,
  setAmount,
  observations,
  setObservations,
  onSave,
}: OperationalExpenseFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-slate-600">
          Tipo de egreso
        </span>
        <select
          value={expenseType}
          onChange={(event) => setExpenseType(event.target.value)}
          className={fieldClassName}
        >
          <option value="Combustible">Combustible</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Peajes">Peajes</option>
          <option value="Otros">Otros</option>
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
          Descripción adicional
        </span>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Detalle del egreso"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
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
          placeholder="Comentarios o detalle adicional"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
        />
      </label>

      <div className="flex justify-end sm:col-span-2">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Guardar egreso
        </button>
      </div>
    </div>
  );
}
