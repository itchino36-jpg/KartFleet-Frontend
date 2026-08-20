import { Pencil, Trash2 } from "lucide-react";

import VehiculoForm from "@/components/vehiculos/VehiculoForm";
import type { PendingVehiculo } from "@/modules/inversionista/hooks/use-nuevo-inversionista";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

interface Props {
  inversionista: Inversionista;
  vehiculos: PendingVehiculo[];
  vehiculoEnEdicion: PendingVehiculo | null;
  formKey: number;
  onSave: (vehiculo: PendingVehiculo) => void;
  onEdit: (vehiculo: PendingVehiculo) => void;
  onDelete: (placa: string) => void;
  onCancelForm: () => void;
  onFinish: () => void;
  isSaving: boolean;
}

export function InversionistaVehicleStep({
  inversionista, vehiculos, vehiculoEnEdicion, formKey, onSave,
  onEdit, onDelete, onCancelForm, onFinish, isSaving,
}: Props) {
  const total = vehiculos.length;

  return (
    <div>
      <div className="border-b border-slate-200 px-6 pt-6">
        <h2 className="pb-5 text-xl font-semibold text-slate-950">Registrar vehículo</h2>
      </div>

      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          {total === 0 ? "Debes agregar al menos un vehículo para continuar." : `${total} vehículo${total === 1 ? "" : "s"} listo${total === 1 ? "" : "s"} para guardar.`}
        </p>
        <button type="button" onClick={onFinish} disabled={total === 0 || isSaving} className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <div className="grid items-start lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 lg:border-r lg:border-slate-200">
          <VehiculoForm
            key={formKey}
            inversionistas={[inversionista]}
            fixedInversionista={inversionista}
            vehiculoInicial={vehiculoEnEdicion ? { ...vehiculoEnEdicion, id: "pending-vehicle" } : undefined}
            onSave={onSave}
            onCancel={onCancelForm}
            cancelLabel={vehiculoEnEdicion ? "Cancelar edición" : "Volver"}
            submitLabel={vehiculoEnEdicion ? "Guardar cambios" : "Agregar vehículo"}
            compact
          />
        </div>

        <aside className="border-t border-slate-200 bg-slate-50 p-4 lg:h-[440px] lg:border-t-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-950">Vehículos agregados</h3>
            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{total}</span>
          </div>

          <div className="mt-3 h-64 overflow-y-auto overscroll-contain pr-1 lg:h-[378px]">
            {total === 0 ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 text-center">
                <p className="text-sm text-slate-500">
                  Los vehículos que agregues aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {vehiculos.map((vehiculo) => (
                  <div key={vehiculo.placa} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-950">{vehiculo.placa}</p>
                      <p className="truncate text-sm text-slate-500">{vehiculo.marca} · {vehiculo.modelo}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button type="button" onClick={() => onEdit(vehiculo)} aria-label={`Editar vehículo ${vehiculo.placa}`} className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => onDelete(vehiculo.placa)} aria-label={`Eliminar vehículo ${vehiculo.placa}`} className="rounded-lg p-2 text-red-600 transition hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

    </div>
  );
}
