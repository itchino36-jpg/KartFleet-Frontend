"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

const OPCIONES_POR_PAGINA = [6, 10, 20, 50];

const normalizarBusqueda = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

interface InversionistasTableProps {
  inversionistas: Inversionista[];
  onEdit: (inversionista: Inversionista) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export default function InversionistasTable({
  inversionistas,
  onEdit,
  onDelete,
  onView,
}: InversionistasTableProps) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [cantidadPorPagina, setCantidadPorPagina] = useState(6);
  const [busqueda, setBusqueda] = useState("");
  const terminoBusqueda = normalizarBusqueda(busqueda);
  const busquedaActiva = terminoBusqueda.length >= 2;
  const inversionistasFiltrados = busquedaActiva
    ? inversionistas.filter((inversionista) =>
        [
          inversionista.nombre,
          inversionista.documento,
          inversionista.telefono,
          inversionista.correo,
        ].some((valor) =>
          normalizarBusqueda(valor).includes(terminoBusqueda)
        )
      )
    : inversionistas;
  const totalPaginas = Math.max(
    1,
    Math.ceil(inversionistasFiltrados.length / cantidadPorPagina)
  );
  const paginaMostrada = Math.min(paginaActual, totalPaginas);
  const indiceInicial = (paginaMostrada - 1) * cantidadPorPagina;
  const inversionistasVisibles = inversionistasFiltrados.slice(
    indiceInicial,
    indiceInicial + cantidadPorPagina
  );

  if (inversionistas.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center">
          <p className="text-sm text-slate-500">
            No hay inversionistas registrados.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Inversionistas registrados
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Información de los inversionistas registrados.
        </p>

        <div className="mt-4 max-w-md">
          <label
            htmlFor="buscar-inversionista"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Buscar inversionista
          </label>
          <input
            id="buscar-inversionista"
            type="search"
            value={busqueda}
            onChange={(event) => {
              setBusqueda(event.target.value);
              setPaginaActual(1);
            }}
            placeholder="Nombre, documento, teléfono o correo (mín. 2)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
          {busqueda.length === 1 && (
            <p className="mt-1.5 text-xs text-slate-500">
              Escribe al menos 2 caracteres para buscar.
            </p>
          )}
        </div>
      </div>

      <div className="h-[385px] overflow-auto overscroll-contain rounded-xl border border-slate-100">
        <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_0_rgb(226_232_240)]">
          <tr className="border-b border-slate-200 text-slate-500">
            <th className="w-14 px-3 py-3 text-center font-medium">N°</th>
            <th className="px-3 py-3 font-medium">Nombre</th>
            <th className="px-3 py-3 font-medium">Documento</th>
            <th className="px-3 py-3 font-medium">Telefono</th>
            <th className="px-3 py-3 font-medium">Correo</th>
            <th className="px-3 py-3 font-medium">Acciones</th>
        
          </tr>
        </thead>

        <tbody>
          {inversionistasVisibles.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-3 py-10 text-center text-sm text-slate-500">
                No se encontraron inversionistas.
              </td>
            </tr>
          ) : inversionistasVisibles.map((inversionista, index) => (
            <tr
              key={inversionista.id}
              className="h-14 border-b border-slate-100 last:border-0">
              <td className="px-3 py-3 text-center font-medium text-slate-500">
                {indiceInicial + index + 1}
              </td>
              <td className="px-3 py-3 font-medium text-slate-900">{inversionista.nombre}</td>
              <td className="px-3 py-3 text-slate-600">{inversionista.documento}</td>
              <td className="px-3 py-3 text-slate-600">{inversionista.telefono}</td>
              <td className="px-3 py-3 text-slate-600">{inversionista.correo}</td>
              
              <td className="px-3 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onView(inversionista.id)}
                    aria-label={`Ver inversionista ${inversionista.nombre}`}
                    title="Ver"
                    className="rounded-lg border border-slate-200 p-2 text-slate-900 transition hover:bg-slate-100"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(inversionista)}
                    aria-label={`Editar inversionista ${inversionista.nombre}`}
                    title="Editar"
                    className="rounded-lg border border-slate-200 p-2 text-slate-900 transition hover:bg-slate-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(inversionista.id)}
                    aria-label={`Eliminar inversionista ${inversionista.nombre}`}
                    title="Eliminar"
                    className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      {inversionistasFiltrados.length > 0 && (
        <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              Mostrar
              <select
                value={cantidadPorPagina}
                onChange={(event) => {
                  setCantidadPorPagina(Number(event.target.value));
                  setPaginaActual(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-2 py-2 font-semibold text-slate-700 outline-none focus:border-slate-500"
                aria-label="Cantidad de inversionistas por página"
              >
                {OPCIONES_POR_PAGINA.map((cantidad) => (
                  <option key={cantidad} value={cantidad}>{cantidad}</option>
                ))}
              </select>
              por página
            </label>
            <p className="text-sm text-slate-500">
              {indiceInicial + 1}–{Math.min(
                indiceInicial + cantidadPorPagina,
                inversionistasFiltrados.length
              )} de {inversionistasFiltrados.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaginaActual(paginaMostrada - 1)}
              disabled={paginaMostrada === 1}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-sm text-slate-600">
              Página {paginaMostrada} de {totalPaginas}
            </span>

            <button
              type="button"
              onClick={() => setPaginaActual(paginaMostrada + 1)}
              disabled={paginaMostrada === totalPaginas}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
