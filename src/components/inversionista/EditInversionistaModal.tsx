import InversionistaForm from "@/components/inversionista/InversionistaForm";
import type { InversionistaFormData } from "@/modules/inversionista/types/inversionista-form.types";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

interface Props {
  inversionista: Inversionista | null;
  onClose: () => void;
  onSave: (data: InversionistaFormData) => void;
}

export function EditInversionistaModal({ inversionista, onClose, onSave }: Props) {
  if (!inversionista) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="editar-usuario-titulo">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 id="editar-usuario-titulo" className="text-xl font-semibold text-slate-950">Editar inversionista</h2>
            <p className="mt-1 text-sm text-slate-500">Modifica los datos del usuario.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar edición" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100">✕</button>
        </div>
        <InversionistaForm initialData={inversionista} isEditing onSave={onSave} onCancel={onClose} />
      </div>
    </div>
  );
}
