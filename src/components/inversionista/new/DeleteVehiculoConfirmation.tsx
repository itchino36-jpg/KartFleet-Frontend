interface DeleteVehiculoConfirmationProps {
  placa: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteVehiculoConfirmation({
  placa,
  onCancel,
  onConfirm,
}: DeleteVehiculoConfirmationProps) {
  if (!placa) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmacion-vehiculo-titulo"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="confirmacion-vehiculo-titulo" className="text-xl font-semibold text-slate-950">
          ¿Eliminar este vehículo?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          El vehículo se quitará de la lista antes de guardar el inversionista.
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            Placa: <span className="font-semibold text-slate-950">{placa}</span>
          </p>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Cancelar
          </button>
          <button type="button" onClick={onConfirm} className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
