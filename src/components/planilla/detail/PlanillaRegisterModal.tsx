import { X } from "lucide-react";
import { ReactNode } from "react";

interface PlanillaRegisterModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function PlanillaRegisterModal({
  open,
  title,
  children,
  onClose,
}: PlanillaRegisterModalProps) {

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Agregar registro
            </p>

            <h3 className="text-lg font-semibold text-slate-950">
              {title}
            </h3>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
            aria-label="Cerrar modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-3 sm:p-4">
          {children}
        </div>
      </div>
    </div>
  );
}