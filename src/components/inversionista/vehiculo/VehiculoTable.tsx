// src/components/inversionista/vehiculo/VehiculoTable.tsx

import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";

interface VehiculoTableProps {
  vehiculos: Vehiculo[];
  inversionistas: Inversionista[];
  onEdit?: (vehiculo: Vehiculo) => void;
  onDelete?: (id: string) => void;
}

export function VehiculoTable({
  vehiculos,
  inversionistas,
  onEdit,
  onDelete,
}: VehiculoTableProps) {
  const getInversionistaNombre = (
    inversionistaId: string
  ) => {
    const inversionista = inversionistas.find(
      (item) => item.id === inversionistaId
    );

    return inversionista?.nombre ?? "Sin inversionista";
  };

  if (vehiculos.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center">
          <p className="text-sm text-slate-500">
            Todavía no hay vehículos registrados.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Vehículos registrados
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Vehículos afiliados a los inversionistas.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="px-3 py-3 font-medium">Inversionista</th>
              <th className="px-3 py-3 font-medium">Placa</th>
              <th className="px-3 py-3 font-medium">Marca</th>
              <th className="px-3 py-3 font-medium">Modelo</th>
              <th className="px-3 py-3 font-medium">Año</th>
              <th className="px-3 py-3 font-medium">color</th>
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
                  {getInversionistaNombre(
                    vehiculo.inversionistaId
                  )}
                </td>

                <td className="px-3 py-3 font-medium text-slate-900">{vehiculo.placa}</td>
                <td className="px-3 py-3 font-medium text-slate-900">{vehiculo.marca}</td>
                <td className="px-3 py-3 font-medium text-slate-900">{vehiculo.modelo}</td>
                <td className="px-3 py-3 font-medium text-slate-900">{vehiculo.año}</td>
                <td className="px-3 py-3 font-medium text-slate-900">{vehiculo.color}</td>
                <td className="px-3 py-3 font-medium text-slate-900">{vehiculo.tipo}</td>

                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(vehiculo)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Editar
                      </button>
                    )}

                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(vehiculo.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}