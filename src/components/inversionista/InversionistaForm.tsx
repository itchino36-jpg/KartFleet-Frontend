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

type CampoInversionista =
  | "nombre"
  | "documento"
  | "telefono"
  | "correo"
  | "direccion";

const inputClassName = (tieneError: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
    tieneError
      ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
      : "border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
  }`;

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
  const [errores, setErrores] = useState<
    Partial<Record<CampoInversionista, string>>
  >({});

  const limpiarError = (campo: CampoInversionista) => {
    setErrores((actuales) => {
      if (!actuales[campo]) return actuales;

      const siguientes = { ...actuales };
      delete siguientes[campo];
      return siguientes;
    });
  };

  const handleSubmit = () => {
    const nuevosErrores: Partial<Record<CampoInversionista, string>> = {};
    const campos: Array<[CampoInversionista, string]> = [
      ["nombre", nombre],
      ["documento", documento],
      ["telefono", telefono],
      ["correo", correo],
      ["direccion", direccion],
    ];

    campos.forEach(([campo, valor]) => {
      if (!valor.trim()) nuevosErrores[campo] = "Necesitas rellenar este campo.";
    });

    if (correo.trim() && !/^\S+@\S+\.\S+$/.test(correo.trim())) {
      nuevosErrores.correo = "Ingresa un correo electrónico válido.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      toast.error("Revisa los campos marcados en rojo");
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
              placeholder="Ej. Juan Pérez"
              onChange={(event) => {
                setNombre(event.target.value);
                limpiarError("nombre");
              }}
              aria-invalid={Boolean(errores.nombre)}
              className={inputClassName(Boolean(errores.nombre))}
            />
            {errores.nombre && <span className="block text-xs font-medium text-red-600">{errores.nombre}</span>}
          </label>

          {/* DOCUMENTO */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Documento
            </span>

            <input
              type="text"
              value={documento}
              placeholder="Ej. 7845123"
              onChange={(event) => {
                setDocumento(event.target.value);
                limpiarError("documento");
              }}
              aria-invalid={Boolean(errores.documento)}
              className={inputClassName(Boolean(errores.documento))}
            />
            {errores.documento && <span className="block text-xs font-medium text-red-600">{errores.documento}</span>}
          </label>

          {/* TELÉFONO */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Teléfono
            </span>

            <input
              type="tel"
              value={telefono}
              placeholder="Ej. 71234567"
              onChange={(event) => {
                setTelefono(event.target.value);
                limpiarError("telefono");
              }}
              aria-invalid={Boolean(errores.telefono)}
              className={inputClassName(Boolean(errores.telefono))}
            />
            {errores.telefono && <span className="block text-xs font-medium text-red-600">{errores.telefono}</span>}
          </label>

          {/* CORREO */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Correo electrónico
            </span>

            <input
              type="email"
              value={correo}
              placeholder="Ej. nombre@gmail.com"
              onChange={(event) => {
                setCorreo(event.target.value);
                limpiarError("correo");
              }}
              aria-invalid={Boolean(errores.correo)}
              className={inputClassName(Boolean(errores.correo))}
            />
            {errores.correo && <span className="block text-xs font-medium text-red-600">{errores.correo}</span>}
          </label>

          {/* DIRECCIÓN */}

          <label className="space-y-1.5 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              Dirección
            </span>

            <input
              type="text"
              value={direccion}
              placeholder="Ej. Av. Principal #123"
              onChange={(event) => {
                setDireccion(event.target.value);
                limpiarError("direccion");
              }}
              aria-invalid={Boolean(errores.direccion)}
              className={inputClassName(Boolean(errores.direccion))}
            />
            {errores.direccion && <span className="block text-xs font-medium text-red-600">{errores.direccion}</span>}
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
