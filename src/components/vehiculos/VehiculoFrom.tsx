"use client";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";
import { normalizeInitialCapital } from "@/modules/inversionista/utils/text.utils";

interface VehiculoFormProps {
  inversionistas: Inversionista[];
  fixedInversionista?: Inversionista;
  vehiculoInicial?: Vehiculo;
  onSave: (vehiculo: Omit<Vehiculo, "id">) => void;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  compact?: boolean;
}

type CampoVehiculo =
  | "inversionistaId"
  | "placa"
  | "marca"
  | "modelo"
  | "año"
  | "color"
  | "tipo";

const inputClassName = (tieneError: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
    tieneError
      ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
      : "border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
  }`;

export default function VehiculoForm({
  inversionistas,
  fixedInversionista,
  vehiculoInicial,
  onSave,
  onCancel,
  submitLabel,
  cancelLabel = "Cancelar",
  compact = false,
}: VehiculoFormProps) {
  const [inversionistaId, setInversionistaId] = useState(
    vehiculoInicial?.inversionistaId ?? fixedInversionista?.id ?? ""
  );
  const [placa, setPlaca] = useState(vehiculoInicial?.placa ?? "");
  const [marca, setMarca] = useState(normalizeInitialCapital(vehiculoInicial?.marca ?? ""));
  const [modelo, setModelo] = useState(normalizeInitialCapital(vehiculoInicial?.modelo ?? ""));
  const [año, setAño] = useState(vehiculoInicial?.año ?? "");
  const [color, setColor] = useState(normalizeInitialCapital(vehiculoInicial?.color ?? ""));
  const [tipo, setTipo] = useState(vehiculoInicial?.tipo ?? "");
  const [errores, setErrores] = useState<Partial<Record<CampoVehiculo, string>>>({});

  const modoEdicion = Boolean(vehiculoInicial);

  const limpiarError = (campo: CampoVehiculo) => {
    setErrores((actuales) => {
      if (!actuales[campo]) return actuales;

      const siguientes = { ...actuales };
      delete siguientes[campo];
      return siguientes;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nuevosErrores: Partial<Record<CampoVehiculo, string>> = {};
    const campos: Array<[CampoVehiculo, string]> = [
      ["inversionistaId", inversionistaId],
      ["placa", placa],
      ["marca", marca],
      ["modelo", modelo],
      ["año", año],
      ["color", color],
      ["tipo", tipo],
    ];

    campos.forEach(([campo, valor]) => {
      if (!valor.trim()) nuevosErrores[campo] = "Necesitas rellenar este campo.";
    });

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      toast.error("Todos los campos del vehículo son obligatorios");
      return;
    }

    const vehiculo: Omit<Vehiculo, "id"> = {
      inversionistaId,
      placa: placa.trim().toUpperCase(),
      marca: normalizeInitialCapital(marca.trim()),
      modelo: normalizeInitialCapital(modelo.trim()),
      año: año.trim(),
      color: normalizeInitialCapital(color.trim()),
      tipo: tipo.trim(),
    };

    onSave(vehiculo);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={compact ? "space-y-3 p-4" : "space-y-5 p-6"}>
        {/* INVERSIONISTA */}
        {!fixedInversionista && (
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">
            Inversionista
          </span>

          <select
            value={inversionistaId}
            onChange={(event) => {
              setInversionistaId(event.target.value);
              limpiarError("inversionistaId");
            }}
            aria-invalid={Boolean(errores.inversionistaId)}
            className={inputClassName(Boolean(errores.inversionistaId))}
          >
            <option value="" disabled>
              Seleccionar inversionista
            </option>

            {inversionistas.map((inversionista) => (
              <option key={inversionista.id} value={inversionista.id}>
                {inversionista.nombre}
              </option>
            ))}
          </select>
          {errores.inversionistaId && (
            <span className="block text-xs font-medium text-red-600">
              {errores.inversionistaId}
            </span>
          )}
        </label>
        )}

        {fixedInversionista && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-500">
              Inversionista
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              {fixedInversionista.nombre}
            </p>
          </div>
        )}

        {/* DATOS DEL VEHÍCULO */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? "gap-3" : "gap-5"}`}>
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Placa
            </span>

            <input
              type="text"
              value={placa}
              placeholder="Ej. 1234-ABC"
              onChange={(event) => {
                setPlaca(event.target.value);
                limpiarError("placa");
              }}
              aria-invalid={Boolean(errores.placa)}
              className={inputClassName(Boolean(errores.placa))}
            />
            {errores.placa && <span className="block text-xs font-medium text-red-600">{errores.placa}</span>}
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Marca
            </span>

            <input
              type="text"
              value={marca}
              placeholder="Ej. Toyota"
              onChange={(event) => {
                setMarca(normalizeInitialCapital(event.target.value));
                limpiarError("marca");
              }}
              aria-invalid={Boolean(errores.marca)}
              className={inputClassName(Boolean(errores.marca))}
            />
            {errores.marca && <span className="block text-xs font-medium text-red-600">{errores.marca}</span>}
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Modelo
            </span>

            <input
              type="text"
              value={modelo}
              placeholder="Ej. Corolla"
              onChange={(event) => {
                setModelo(normalizeInitialCapital(event.target.value));
                limpiarError("modelo");
              }}
              aria-invalid={Boolean(errores.modelo)}
              className={inputClassName(Boolean(errores.modelo))}
            />
            {errores.modelo && <span className="block text-xs font-medium text-red-600">{errores.modelo}</span>}
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Año
            </span>

            <input
              type="number"
              value={año}
              placeholder="Ej. 2024"
              onChange={(event) => {
                setAño(event.target.value);
                limpiarError("año");
              }}
              aria-invalid={Boolean(errores.año)}
              min="1900"
              max="2100"
              className={inputClassName(Boolean(errores.año))}
            />
            {errores.año && <span className="block text-xs font-medium text-red-600">{errores.año}</span>}
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Color
            </span>

            <input
              type="text"
              value={color}
              placeholder="Ej. Blanco"
              onChange={(event) => {
                setColor(normalizeInitialCapital(event.target.value));
                limpiarError("color");
              }}
              aria-invalid={Boolean(errores.color)}
              className={inputClassName(Boolean(errores.color))}
            />
            {errores.color && <span className="block text-xs font-medium text-red-600">{errores.color}</span>}
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Tipo de vehículo
            </span>

            <select
              value={tipo}
              onChange={(event) => {
                setTipo(event.target.value);
                limpiarError("tipo");
              }}
              aria-invalid={Boolean(errores.tipo)}
              className={inputClassName(Boolean(errores.tipo))}
            >
              <option value="" disabled>
                Seleccionar tipo de vehículo
              </option>
              <option value="Moto">Moto</option>
              <option value="Auto">Auto</option>
              <option value="Camión">Camión</option>
            </select>
            {errores.tipo && <span className="block text-xs font-medium text-red-600">{errores.tipo}</span>}
          </label>
        </div>
      </div>

      {/* BOTONES */}
      <div className={`flex flex-col-reverse gap-3 border-t border-slate-200 sm:flex-row sm:justify-end ${compact ? "p-4" : "p-6"}`}>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          {cancelLabel}
        </button>

        <button
          type="submit"
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {submitLabel ?? (modoEdicion ? "Guardar cambios" : "Guardar")}
        </button>
      </div>
    </form>
  );
}
