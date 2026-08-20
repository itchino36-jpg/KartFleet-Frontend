"use client";

import { useMemo, useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import type { Vehiculo } from "@/modules/vehiculo/types/vehiculo.types";
import type { Seguro, SeguroFormData } from "@/modules/seguros/types/seguro.types";

interface Props { seguro?: Seguro; vehiculos: Vehiculo[]; aseguradoras: string[]; onSave: (data: SeguroFormData) => Promise<boolean>; onClose: () => void }
type Field = Exclude<keyof SeguroFormData, "cuotas">;
const fieldClass = (bad = false) => `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none ${bad ? "border-red-500" : "border-slate-300 focus:border-slate-900"}`;
function FieldError({ name, errors }: { name: Field; errors: Partial<Record<Field, string>> }) { return errors[name] ? <span className="block text-xs font-medium text-red-600">{errors[name]}</span> : null; }

function calculateInstallments(amountValue: string, startDate: string) {
  const amount = Number(amountValue);
  if (!Number.isFinite(amount) || amount <= 0 || !startDate) return [];
  const [year, month] = startDate.split("-").map(Number);
  const regularAmount = Math.round((amount / 5) * 100) / 100;
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(Date.UTC(year, month - 1 + index, 1));
    const paidBefore = regularAmount * index;
    const installmentAmount = index === 4 ? Math.round((amount - paidBefore) * 100) / 100 : regularAmount;
    return { id: `cuota-${index + 1}`, mes: date.toISOString().slice(0, 7), monto: installmentAmount.toFixed(2) };
  });
}

export function SeguroForm({ seguro, vehiculos, aseguradoras, onSave, onClose }: Props) {
  const [form, setForm] = useState<SeguroFormData>({ vehiculoId: seguro?.vehiculoId ?? "", aseguradora: seguro?.aseguradora ?? "", numeroPoliza: seguro?.numeroPoliza ?? "", valorAsegurado: seguro?.valorAsegurado ?? "", franquicia: seguro?.franquicia ?? "", fechaInicio: seguro?.fechaInicio ?? "", fechaFin: seguro?.fechaFin ?? "", observaciones: seguro?.observaciones ?? "", modalidadPago: seguro?.modalidadPago ?? "contado", cuotas: seguro?.cuotas ?? [] });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [saving, setSaving] = useState(false);
  const calculatedInstallments = useMemo(() => calculateInstallments(form.valorAsegurado, form.fechaInicio), [form.valorAsegurado, form.fechaInicio]);
  const update = (field: Field, value: string) => { setForm((old) => ({ ...old, [field]: value })); setErrors((old) => ({ ...old, [field]: undefined })); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); if (saving) return;
    const next: Partial<Record<Field, string>> = {};
    (["vehiculoId", "aseguradora", "valorAsegurado", "franquicia", "fechaInicio", "fechaFin"] as Field[]).forEach((field) => { if (!form[field]?.trim()) next[field] = "Este campo es obligatorio."; });
    if (form.valorAsegurado && (!Number.isFinite(Number(form.valorAsegurado)) || Number(form.valorAsegurado) <= 0)) next.valorAsegurado = "Ingresa un valor numérico mayor que cero.";
    if (form.franquicia && (!Number.isFinite(Number(form.franquicia)) || Number(form.franquicia) < 0)) next.franquicia = "Ingresa un valor numérico igual o mayor que cero.";
    if (form.fechaInicio && form.fechaFin && form.fechaFin < form.fechaInicio) next.fechaFin = "No puede ser anterior a la fecha de inicio.";
    if (form.modalidadPago === "credito" && !calculatedInstallments.length) next.modalidadPago = "Completa el valor asegurado y la fecha de inicio para calcular las cuotas.";
    setErrors(next); if (Object.keys(next).length) return;
    setSaving(true); const ok = await onSave({ ...form, cuotas: form.modalidadPago === "credito" ? calculatedInstallments : [], numeroPoliza: form.numeroPoliza?.trim().toUpperCase(), observaciones: form.observaciones?.trim() }); setSaving(false); if (ok) onClose();
  };
  return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-3" role="dialog" aria-modal="true">
    <form onSubmit={submit} className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
      <header className="sticky top-0 z-10 flex justify-between border-b bg-white p-5"><div><h2 className="text-xl font-semibold">{seguro ? "Editar seguro" : "Registrar seguro"}</h2><p className="mt-1 text-sm text-slate-500">Completa la información de la póliza.</p></div><button type="button" onClick={onClose} aria-label="Cerrar"><X /></button></header>
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        <label className="space-y-1.5"><span className="text-sm font-medium">Vehículo *</span><select value={form.vehiculoId} onChange={(e) => update("vehiculoId", e.target.value)} className={fieldClass(!!errors.vehiculoId)}><option value="">Seleccionar por placa</option>{vehiculos.map((v) => <option key={v.id} value={v.id}>{v.placa}</option>)}</select><FieldError name="vehiculoId" errors={errors} /></label>
        <label className="space-y-1.5"><span className="text-sm font-medium">Aseguradora *</span><select value={form.aseguradora} onChange={(e) => update("aseguradora", e.target.value)} className={fieldClass(!!errors.aseguradora)}><option value="">Seleccionar aseguradora</option>{aseguradoras.map((name) => <option key={name}>{name}</option>)}</select><FieldError name="aseguradora" errors={errors} />{!aseguradoras.length && <span className="text-xs text-amber-700">No hay aseguradoras disponibles en el catálogo del sistema.</span>}</label>
        <label className="space-y-1.5"><span className="text-sm font-medium">N° de póliza (opcional)</span><input value={form.numeroPoliza} onChange={(e) => update("numeroPoliza", e.target.value)} className={fieldClass()} /></label>
        <label className="space-y-1.5"><span className="text-sm font-medium">Valor asegurado (Bs) *</span><input type="number" min="0.01" step="0.01" value={form.valorAsegurado} onChange={(e) => update("valorAsegurado", e.target.value)} className={fieldClass(!!errors.valorAsegurado)} /><FieldError name="valorAsegurado" errors={errors} /></label>
        <label className="space-y-1.5"><span className="text-sm font-medium">Franquicia (Bs) *</span><input type="number" min="0" step="0.01" value={form.franquicia} onChange={(e) => update("franquicia", e.target.value)} className={fieldClass(!!errors.franquicia)} /><FieldError name="franquicia" errors={errors} /></label><div />
        <label className="space-y-1.5"><span className="text-sm font-medium">Fecha de inicio *</span><input type="date" value={form.fechaInicio} onChange={(e) => update("fechaInicio", e.target.value)} className={fieldClass(!!errors.fechaInicio)} /><FieldError name="fechaInicio" errors={errors} /></label>
        <label className="space-y-1.5"><span className="text-sm font-medium">Fecha de fin *</span><input type="date" min={form.fechaInicio} value={form.fechaFin} onChange={(e) => update("fechaFin", e.target.value)} className={fieldClass(!!errors.fechaFin)} /><FieldError name="fechaFin" errors={errors} /></label>
        <label className="space-y-1.5 sm:col-span-2"><span className="text-sm font-medium">Observaciones (opcional)</span><textarea rows={3} value={form.observaciones} onChange={(e) => update("observaciones", e.target.value)} className={fieldClass()} /></label>
        <fieldset className="space-y-3 rounded-xl border border-slate-200 p-4 sm:col-span-2"><legend className="px-1 text-sm font-semibold">Forma de pago *</legend><div className="grid grid-cols-2 gap-3"><label className={`cursor-pointer rounded-xl border p-3 text-sm font-semibold ${form.modalidadPago === "contado" ? "border-slate-950 bg-slate-50 ring-1 ring-slate-950" : "border-slate-200"}`}><input type="radio" name="modalidadPago" value="contado" checked={form.modalidadPago === "contado"} onChange={() => setForm((old) => ({ ...old, modalidadPago: "contado", cuotas: [] }))} className="mr-2" />Contado</label><label className={`cursor-pointer rounded-xl border p-3 text-sm font-semibold ${form.modalidadPago === "credito" ? "border-slate-950 bg-slate-50 ring-1 ring-slate-950" : "border-slate-200"}`}><input type="radio" name="modalidadPago" value="credito" checked={form.modalidadPago === "credito"} onChange={() => setForm((old) => ({ ...old, modalidadPago: "credito" }))} className="mr-2" />Crédito</label></div><FieldError name="modalidadPago" errors={errors} /></fieldset>
        {form.modalidadPago === "credito" && <section className="space-y-3 rounded-xl border border-slate-300 bg-slate-50 p-4 sm:col-span-2"><div><h3 className="text-sm font-semibold">Plan automático de pagos</h3><p className="text-xs text-slate-500">El valor asegurado se divide automáticamente en cinco cuotas mensuales del 20%.</p></div>{!calculatedInstallments.length ? <p className="rounded-lg border border-dashed bg-white p-5 text-center text-sm text-slate-500">Ingresa el valor asegurado y la fecha de inicio para ver el plan.</p> : <div className="overflow-hidden rounded-lg border bg-white"><div className="grid grid-cols-[70px_1fr_1fr] bg-slate-100 px-3 py-2 text-xs font-semibold uppercase text-slate-500"><span>Cuota</span><span>Mes</span><span className="text-right">Monto</span></div>{calculatedInstallments.map((cuota, index) => <div key={cuota.id} className="grid grid-cols-[70px_1fr_1fr] border-t px-3 py-3 text-sm"><span className="font-medium">{index + 1} de 5</span><span className="capitalize">{new Intl.DateTimeFormat("es-BO", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${cuota.mes}-01T00:00:00Z`))}</span><span className="text-right font-semibold">{new Intl.NumberFormat("es-BO", { style: "currency", currency: "BOB" }).format(Number(cuota.monto))}</span></div>)}</div>}<div className="flex items-center justify-between border-t pt-3"><span className="text-xs text-slate-500">5 cuotas × 20%</span><p className="text-sm font-semibold">Total: {new Intl.NumberFormat("es-BO", { style: "currency", currency: "BOB" }).format(calculatedInstallments.reduce((sum, cuota) => sum + Number(cuota.monto), 0))}</p></div></section>}
      </div>
      <footer className="sticky bottom-0 flex flex-col-reverse gap-2 border-t bg-white p-5 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} disabled={saving} className="rounded-xl border px-5 py-2.5 text-sm font-semibold">Cancelar</button><button type="submit" disabled={saving || !vehiculos.length || !aseguradoras.length} className="inline-flex justify-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{saving && <LoaderCircle className="h-4 w-4 animate-spin" />}{seguro ? "Guardar cambios" : "Guardar"}</button></footer>
    </form>
  </div>;
}
