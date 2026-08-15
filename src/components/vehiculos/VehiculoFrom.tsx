"use client";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";

interface VehiculoFormProps {
  inversionistas: Inversionista[];
  fixedInversionista?: Inversionista;
  vehiculoInicial?: Vehiculo;
  onSave: (vehiculo: Omit<Vehiculo, "id">) => void;
  onCancel: () => void;
}

export default function VehiculoForm({
  inversionistas,
  fixedInversionista,
  vehiculoInicial,
  onSave,
  onCancel,
}: VehiculoFormProps) {
  const [inversionistaId, setInversionistaId] = useState(
    vehiculoInicial?.inversionistaId ?? fixedInversionista?.id ?? ""
  );
  const [placa, setPlaca] = useState(vehiculoInicial?.placa ?? "");
  const [marca, setMarca] = useState(vehiculoInicial?.marca ?? "");
  const [modelo, setModelo] = useState(vehiculoInicial?.modelo ?? "");
  const [año, setAño] = useState(vehiculoInicial?.año ?? "");
  const [color, setColor] = useState(vehiculoInicial?.color ?? "");
  const [tipo, setTipo] = useState(vehiculoInicial?.tipo ?? "");

  const modoEdicion = Boolean(vehiculoInicial);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !inversionistaId.trim() ||
      !placa.trim() ||
      !marca.trim() ||
      !modelo.trim() ||
      !año.trim() ||
      !color.trim() ||
      !tipo.trim()
    ) {
      toast.error("Todos los campos del vehículo son obligatorios");
      return;
    }

    const vehiculo: Omit<Vehiculo, "id"> = {
      inversionistaId,
      placa: placa.trim().toUpperCase(),
      marca: marca.trim(),
      modelo: modelo.trim(),
      año: año.trim(),
      color: color.trim(),
      tipo: tipo.trim(),
    };

    onSave(vehiculo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5 p-6">
        {/* INVERSIONISTA */}
        {!fixedInversionista && (
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">
            Inversionista
          </span>

          <select
            value={inversionistaId}
            onChange={(event) => setInversionistaId(event.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Placa
            </span>

            <input
              type="text"
              value={placa}
              onChange={(event) => setPlaca(event.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Marca
            </span>

            <input
              type="text"
              value={marca}
              onChange={(event) => setMarca(event.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Modelo
            </span>

            <input
              type="text"
              value={modelo}
              onChange={(event) => setModelo(event.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Año
            </span>

            <input
              type="number"
              value={año}
              onChange={(event) => setAño(event.target.value)}
              required
              min="1900"
              max="2100"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Color
            </span>

            <input
              type="text"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Tipo de vehículo
            </span>

            <input
              type="text"
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
              required
              placeholder="Ej. Camión, automóvil, bus..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {modoEdicion ? "Guardar cambios" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
