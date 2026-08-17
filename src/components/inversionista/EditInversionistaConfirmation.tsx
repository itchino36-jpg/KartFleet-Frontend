import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

interface Props {
  inversionista: Inversionista | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function EditInversionistaConfirmation({ inversionista, onCancel, onConfirm }: Props) {
  if (!inversionista) return null;

  const datos = [
    ["Nombre", inversionista.nombre],
    ["Documento", inversionista.documento],
    ["Teléfono", inversionista.telefono],
    ["Correo", inversionista.correo],
    ["Dirección", inversionista.direccion],
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="editar-inversionista-titulo">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="editar-inversionista-titulo" className="text-xl font-semibold text-slate-950">
          ¿Confirmar actualización?
        </h2>
        <p className="mt-2 text-sm text-slate-600">Revisa los datos que estás por guardar.</p>
        <dl className="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          {datos.map(([etiqueta, valor]) => (
            <div key={etiqueta} className={etiqueta === "Dirección" ? "sm:col-span-2" : ""}>
              <dt className="text-xs font-medium text-slate-500">{etiqueta}</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">{valor}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Volver</button>
          <button type="button" onClick={onConfirm} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Sí, actualizar</button>
        </div>
      </div>
    </div>
  );
}
