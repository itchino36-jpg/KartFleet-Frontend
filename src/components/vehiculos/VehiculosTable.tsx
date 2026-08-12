"use client";

import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";

interface VehiculosTableProps {
  vehiculos: Vehiculo[];
  inversionistas: Inversionista[];
  onEdit: (vehiculo: Vehiculo) => void;
  onDelete: (id: string) => void;
}

export default function VehiculosTable({
  vehiculos,
  inversionistas,
  onEdit,
  onDelete,
}: VehiculosTableProps) {
  const getInversionistaNombre = (inversionistaId: string) => {
    const inversionista = inversionistas.find(
      (item) => item.id === inversionistaId
    );

    return inversionista?.nombre ?? "Sin inversionista";
  };

  if (vehiculos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center">
        <p className="text-sm text-slate-500">
          Todavía no hay vehículos registrados.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500">
            <th className="px-3 py-3 font-medium">Inversionista</th>
            <th className="px-3 py-3 font-medium">Placa</th>
            <th className="px-3 py-3 font-medium">Marca</th>
            <th className="px-3 py-3 font-medium">Modelo</th>
            <th className="px-3 py-3 font-medium">Año</th>
            <th className="px-3 py-3 font-medium">Color</th>
            <th className="px-3 py-3 font-medium">Tipo</th>
            <th className="px-3 py-3 font-medium">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr
              key={vehiculo.id}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-3 font-medium text-slate-900">
                {getInversionistaNombre(vehiculo.inversionistaId)}
              </td>

              <td className="px-3 py-3 text-slate-600">
                {vehiculo.placa}
              </td>

              <td className="px-3 py-3 text-slate-600">
                {vehiculo.marca}
              </td>

              <td className="px-3 py-3 text-slate-600">
                {vehiculo.modelo}
              </td>

              <td className="px-3 py-3 text-slate-600">
                {vehiculo.año}
              </td>

              <td className="px-3 py-3 text-slate-600">
                {vehiculo.color}
              </td>

              <td className="px-3 py-3 text-slate-600">
                {vehiculo.tipo}
              </td>

              <td className="px-3 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(vehiculo)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(vehiculo.id)}
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