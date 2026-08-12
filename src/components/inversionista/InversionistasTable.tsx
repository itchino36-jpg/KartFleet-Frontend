"use client";

import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

interface InversionistasTableProps {
  inversionistas: Inversionista[];
  onEdit: (inversionista: Inversionista) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export default function InversionistasTable({
  inversionistas,
  onEdit,
  onDelete,
  onView,
}: InversionistasTableProps) {
  if (inversionistas.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center">
        <p className="text-sm text-slate-500">
          No hay inversionistas registrados.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500">
            <th className="px-3 py-3 font-medium">
              Nombre
            </th>

            <th className="px-3 py-3 font-medium">
              Documento
            </th>

            <th className="px-3 py-3 font-medium">
              Teléfono
            </th>

            <th className="px-3 py-3 font-medium">
              Correo
            </th>

            <th className="px-3 py-3 font-medium">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {inversionistas.map((inversionista) => (
            <tr
              key={inversionista.id}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-3 font-medium text-slate-900">
                {inversionista.nombre}
              </td>

              <td className="px-3 py-3 text-slate-600">
                {inversionista.documento}
              </td>

              <td className="px-3 py-3 text-slate-600">
                {inversionista.telefono}
              </td>

              <td className="px-3 py-3 text-slate-600">
                {inversionista.correo}
              </td>

              <td className="px-3 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onView(inversionista.id)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Ver
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(inversionista)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(inversionista.id)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}