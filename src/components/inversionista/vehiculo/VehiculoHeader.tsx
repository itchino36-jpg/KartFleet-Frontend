// src/components/inversionista/vehiculo/VehiculoHeader.tsx

interface VehiculoHeaderProps {
  onAdd: () => void;
}

export function VehiculoHeader({
  onAdd,
}: VehiculoHeaderProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Vehículos
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gestión de vehículos afiliados.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          + Agregar nuevo
        </button>
      </div>
    </section>
  );
}