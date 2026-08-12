"use client";

import type { ExpenseHistoryEntry } from "@/modules/planilla/forms/OperationalExpenses";

interface ExpenseHistoryProps {
entries: ExpenseHistoryEntry[];
}

export default function ExpenseHistory({
entries,
}: ExpenseHistoryProps) {
if (entries.length === 0) {
return ( <div className="rounded-2xl border border-slate-200 bg-white p-6"> <p className="font-semibold text-slate-950">
No hay egresos registrados. </p>


    <p className="mt-1 text-sm text-slate-500">
      Los registros que agregues aparecerán aquí.
    </p>
  </div>
);


}

return ( 
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white"> 
      <table className="w-full min-w-[700px] border-collapse"> 
        <thead> 
          <tr className="border-b border-slate-200"> 
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Fecha 
            </th> 
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Tipo egreso 
            </th> 
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Descripción 
            </th> 
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Monto 
            </th>   
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Observaciones 
            </th> 
          </tr> 
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.id}
              className="border-b border-slate-100"
            >
              <td className="px-4 py-4 text-sm text-slate-700">
                {entry.createdAt}
              </td>

              <td className="px-4 py-4 text-sm font-semibold text-slate-950">
                {entry.expenseType}
              </td>

              <td className="px-4 py-4 text-sm text-slate-700">
                {entry.description}
              </td>

              <td className="px-4 py-4 text-sm font-semibold tabular-nums text-slate-950">
                Bs {entry.amount}
              </td>

              <td className="px-4 py-4 text-sm text-slate-700">
                {entry.observations || "Sin observaciones"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
