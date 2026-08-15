"use client";

import { useState } from "react";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import { toast } from "@/components/ui/toast";
import type { InversionistaFormData } from "@/modules/inversionista/types/inversionista-form.types";

interface InversionistaFormProps {
  initialData?: Inversionista;
  isEditing: boolean;
  onSave: (data: InversionistaFormData) => void;
  onCancel: () => void;
}

export default function InversionistaForm({
  initialData,
  isEditing,
  onSave,
  onCancel,
}: InversionistaFormProps) {
  const [nombre, setNombre] = useState(
    initialData?.nombre ?? ""
  );
  const [documento, setDocumento] = useState(
    initialData?.documento ?? ""
  );
  const [telefono, setTelefono] = useState(
    initialData?.telefono ?? ""
  );
  const [correo, setCorreo] = useState(
    initialData?.correo ?? ""
  );
  const [direccion, setDireccion] = useState(
    initialData?.direccion ?? ""
  );
  const handleSubmit = () => {
    if (
      !nombre.trim() ||
      !documento.trim() ||
      !telefono.trim() ||
      !correo.trim() ||
      !direccion.trim()
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(correo.trim())) {
      toast.error("Ingresa un correo electrónico válido");
      return;
    }

    onSave({
      nombre,
      documento,
      telefono,
      correo,
      direccion,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* INFORMACIÓN DEL INVERSIONISTA */}

      <section className="rounded-xl border border-slate-200 p-5">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-950">
            Información del inversionista
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* NOMBRE */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Nombre completo
            </span>

            <input
              type="text"
              value={nombre}
              onChange={(event) =>
                setNombre(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          {/* DOCUMENTO */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Documento
            </span>

            <input
              type="text"
              value={documento}
              onChange={(event) =>
                setDocumento(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          {/* TELÉFONO */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Teléfono
            </span>

            <input
              type="tel"
              value={telefono}
              onChange={(event) =>
                setTelefono(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          {/* CORREO */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Correo electrónico
            </span>

            <input
              type="email"
              value={correo}
              onChange={(event) =>
                setCorreo(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          {/* DIRECCIÓN */}

          <label className="space-y-1.5 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              Dirección
            </span>

            <input
              type="text"
              value={direccion}
              onChange={(event) =>
                setDireccion(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>
        </div>
      </section>

      {/* BOTONES */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {isEditing
            ? "Guardar cambios"
            : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
