"use client";

import { useEffect, useState } from "react";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { Vehiculo } from "@/modules/vehiculo/types/vehiculo.types";

interface VehiculoFormProps {
  inversionistas: Inversionista[];
  vehiculoInicial?: Vehiculo;
  onSave: (vehiculo: Vehiculo) => void;
  onCancel: () => void;
}

export default function VehiculoForm({
  inversionistas,
  vehiculoInicial,
  onSave,
  onCancel,
}: VehiculoFormProps) {
  const [inversionistaId, setInversionistaId] = useState("");
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [año, setAño] = useState("");
  const [color, setColor] = useState("");
  const [tipo, setTipo] = useState("");

  const modoEdicion = Boolean(vehiculoInicial);

  useEffect(() => {
    if (vehiculoInicial) {
      setInversionistaId(vehiculoInicial.inversionistaId);
      setPlaca(vehiculoInicial.placa);
      setMarca(vehiculoInicial.marca);
      setModelo(vehiculoInicial.modelo);
      setAño(vehiculoInicial.año);
      setColor(vehiculoInicial.color);
      setTipo(vehiculoInicial.tipo);
      return;
    }

    setInversionistaId("");
    setPlaca("");
    setMarca("");
    setModelo("");
    setAño("");
    setColor("");
    setTipo("");
  }, [vehiculoInicial]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const vehiculo: Vehiculo = {
      id: vehiculoInicial?.id ?? crypto.randomUUID(),
      inversionistaId,
      placa,
      marca,
      modelo,
      año,
      color,
      tipo,
    };

    onSave(vehiculo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5 p-6">
        {/* INVERSIONISTA */}
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

        {/* DATOS DEL VEHÍCULO */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* PLACA */}
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

          {/* MARCA */}
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

          {/* MODELO */}
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

          {/* AÑO */}
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

          {/* COLOR */}
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

          {/* TIPO */}
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