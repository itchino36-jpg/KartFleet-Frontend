"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, ShieldCheck, Trash2 } from "lucide-react";
import { SeguroForm } from "@/components/seguros/SeguroForm";
import { toast } from "@/components/ui/toast";
import { useVehiculos } from "@/modules/inversionista/hooks/use-vehiculos";
import type { Seguro, SeguroFormData, SeguroStatus } from "@/modules/seguros/types/seguro.types";
import { useSeguros } from "@/modules/seguros/hooks/use-seguros";
import { formatDate, formatMoney, getSeguroStatus, SEGURO_STATUS_LABELS } from "@/modules/seguros/utils/seguro.utils";

const statusClasses: Record<SeguroStatus, string> = {
  vigente: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  por_vencer: "bg-amber-50 text-amber-700 ring-amber-600/20",
  vencido: "bg-red-50 text-red-700 ring-red-600/20",
};

export default function SegurosPage() {
  const { vehiculos } = useVehiculos();
  const { seguros, addSeguro, editSeguro, removeSeguro } = useSeguros();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SeguroStatus | "todos">("todos");
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<Seguro | null>(null);
  const [toDelete, setToDelete] = useState<Seguro | null>(null);

  const vehicleLabel = (vehicleId: string) => {
    const vehicle = vehiculos.find((item) => item.id === vehicleId);
    return vehicle ? `${vehicle.placa} · ${vehicle.marca} ${vehicle.modelo}` : "Vehículo no disponible";
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("es-BO");
    return seguros.filter((seguro) => {
      const status = getSeguroStatus(seguro.fechaVencimiento);
      const matchesStatus = statusFilter === "todos" || status === statusFilter;
      const vehicle = vehiculos.find((item) => item.id === seguro.vehiculoId);
      const searchable = [seguro.aseguradora, seguro.numeroPoliza, seguro.tipoCobertura, vehicle?.placa, vehicle?.marca, vehicle?.modelo].join(" ").toLocaleLowerCase("es-BO");
      return matchesStatus && (!term || searchable.includes(term));
    });
  }, [search, seguros, statusFilter, vehiculos]);

  const totals = useMemo(() => ({
    total: seguros.length,
    vigente: seguros.filter((item) => getSeguroStatus(item.fechaVencimiento) === "vigente").length,
    por_vencer: seguros.filter((item) => getSeguroStatus(item.fechaVencimiento) === "por_vencer").length,
    vencido: seguros.filter((item) => getSeguroStatus(item.fechaVencimiento) === "vencido").length,
  }), [seguros]);

  const save = (data: SeguroFormData) => {
    const duplicate = seguros.some((item) => item.id !== selected?.id && item.numeroPoliza.toLowerCase() === data.numeroPoliza.toLowerCase());
    if (duplicate) {
      toast.error("Ya existe un seguro con ese número de póliza");
      return;
    }
    if (selected) {
      editSeguro(selected.id, data);
      toast.success("Seguro actualizado correctamente");
    } else {
      addSeguro(data);
      toast.success("Seguro registrado correctamente");
    }
    setFormOpen(false);
    setSelected(null);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-slate-700" /><h1 className="text-2xl font-semibold text-slate-950">Seguros</h1></div>
          <p className="mt-1 text-sm text-slate-500">Administra las pólizas y vencimientos de los vehículos.</p>
        </div>
        <button type="button" onClick={() => { setSelected(null); setFormOpen(true); }} className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"><Plus className="h-4 w-4" />Nuevo seguro</button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {([['Total', totals.total, 'text-slate-950'], ['Vigentes', totals.vigente, 'text-emerald-700'], ['Por vencer', totals.por_vencer, 'text-amber-700'], ['Vencidos', totals.vencido, 'text-red-700']] as const).map(([label, value, color]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p><p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p></div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row">
          <label className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar póliza, vehículo o aseguradora" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-900" /></label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as SeguroStatus | "todos")} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-900"><option value="todos">Todos los estados</option><option value="vigente">Vigentes</option><option value="por_vencer">Por vencer</option><option value="vencido">Vencidos</option></select>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-16 text-center"><ShieldCheck className="mx-auto h-10 w-10 text-slate-300" /><p className="mt-3 font-medium text-slate-700">No se encontraron seguros</p><p className="mt-1 text-sm text-slate-500">Registra una póliza o modifica los filtros.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3 font-medium">Vehículo</th><th className="px-4 py-3 font-medium">Póliza</th><th className="px-4 py-3 font-medium">Aseguradora</th><th className="px-4 py-3 font-medium">Cobertura</th><th className="px-4 py-3 font-medium">Vencimiento</th><th className="px-4 py-3 font-medium">Prima</th><th className="px-4 py-3 font-medium">Estado</th><th className="px-4 py-3 text-right font-medium">Acciones</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((seguro) => {
                  const status = getSeguroStatus(seguro.fechaVencimiento);
                  return <tr key={seguro.id} className="hover:bg-slate-50/70"><td className="px-4 py-3 font-medium text-slate-900">{vehicleLabel(seguro.vehiculoId)}</td><td className="px-4 py-3 text-slate-700">{seguro.numeroPoliza}</td><td className="px-4 py-3 text-slate-700">{seguro.aseguradora}</td><td className="px-4 py-3 text-slate-600">{seguro.tipoCobertura}</td><td className="px-4 py-3 text-slate-600">{formatDate(seguro.fechaVencimiento)}</td><td className="px-4 py-3 text-slate-600">{formatMoney(seguro.costoPrima)}</td><td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses[status]}`}>{SEGURO_STATUS_LABELS[status]}</span></td><td className="px-4 py-3"><div className="flex justify-end gap-1"><button type="button" onClick={() => { setSelected(seguro); setFormOpen(true); }} aria-label={`Editar póliza ${seguro.numeroPoliza}`} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => setToDelete(seguro)} aria-label={`Eliminar póliza ${seguro.numeroPoliza}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button></div></td></tr>;
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen && <SeguroForm key={selected?.id ?? "new"} seguro={selected ?? undefined} vehiculos={vehiculos} onSave={save} onClose={() => { setFormOpen(false); setSelected(null); }} />}
      {toDelete && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><h2 className="text-xl font-semibold text-slate-950">¿Eliminar este seguro?</h2><p className="mt-3 text-sm text-slate-600">Se eliminará la póliza <strong>{toDelete.numeroPoliza}</strong> de {vehicleLabel(toDelete.vehiculoId)}.</p><div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => setToDelete(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Cancelar</button><button type="button" onClick={() => { removeSeguro(toDelete.id); setToDelete(null); toast.success("Seguro eliminado correctamente"); }} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Eliminar</button></div></div></div>}
    </div>
  );
}
