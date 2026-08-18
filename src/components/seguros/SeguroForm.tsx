"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "@/components/ui/toast";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";
import type { Seguro, SeguroFormData } from "@/modules/seguros/types/seguro.types";
import { normalizeInitialCapital } from "@/modules/inversionista/utils/text.utils";

interface SeguroFormProps {
  seguro?: Seguro;
  vehiculos: Vehiculo[];
  onSave: (data: SeguroFormData) => void;
  onClose: () => void;
}

type RequiredField = Exclude<keyof SeguroFormData, "observaciones">;

const inputClass = (hasError = false) =>
  `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
      : "border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
  }`;

export function SeguroForm({ seguro, vehiculos, onSave, onClose }: SeguroFormProps) {
  const [form, setForm] = useState<SeguroFormData>({
    vehiculoId: seguro?.vehiculoId ?? "",
    aseguradora: seguro?.aseguradora ?? "",
    numeroPoliza: seguro?.numeroPoliza ?? "",
    tipoCobertura: seguro?.tipoCobertura ?? "",
    fechaInicio: seguro?.fechaInicio ?? "",
    fechaVencimiento: seguro?.fechaVencimiento ?? "",
    montoAsegurado: seguro?.montoAsegurado ?? "",
    costoPrima: seguro?.costoPrima ?? "",
    observaciones: seguro?.observaciones ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});

  const update = (field: keyof SeguroFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field !== "observaciones") {
      setErrors((current) => {
        if (!current[field]) return current;
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const requiredFields: RequiredField[] = ["vehiculoId", "aseguradora", "numeroPoliza", "tipoCobertura", "fechaInicio", "fechaVencimiento", "montoAsegurado", "costoPrima"];
    const nextErrors: Partial<Record<RequiredField, string>> = {};
    requiredFields.forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = "Necesitas rellenar este campo.";
    });
    if (form.fechaInicio && form.fechaVencimiento && form.fechaVencimiento < form.fechaInicio) {
      nextErrors.fechaVencimiento = "Debe ser posterior a la fecha de inicio.";
    }
    if (form.montoAsegurado && Number(form.montoAsegurado) <= 0) {
      nextErrors.montoAsegurado = "El monto debe ser mayor que cero.";
    }
    if (form.costoPrima && Number(form.costoPrima) <= 0) {
      nextErrors.costoPrima = "El costo debe ser mayor que cero.";
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    onSave({
      ...form,
      aseguradora: normalizeInitialCapital(form.aseguradora.trim()),
      numeroPoliza: form.numeroPoliza.trim().toUpperCase(),
      tipoCobertura: normalizeInitialCapital(form.tipoCobertura.trim()),
      observaciones: form.observaciones.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-3 sm:p-4" role="dialog" aria-modal="true">
      <form onSubmit={handleSubmit} className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 sm:text-xl">{seguro ? "Editar seguro" : "Registrar seguro"}</h2>
            <p className="mt-1 text-sm text-slate-500">Completa la información de la póliza.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6">
          <label className="space-y-1.5 sm:col-span-2"><span className="text-sm font-medium text-slate-700">Vehículo *</span>
            <select value={form.vehiculoId} onChange={(e) => update("vehiculoId", e.target.value)} aria-invalid={Boolean(errors.vehiculoId)} className={inputClass(Boolean(errors.vehiculoId))}>
              <option value="">Seleccionar vehículo</option>
              {vehiculos.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.placa} · {vehicle.marca} {vehicle.modelo}</option>)}
            </select>
            {errors.vehiculoId && <span className="block text-xs font-medium text-red-600">{errors.vehiculoId}</span>}
            {vehiculos.length === 0 && <span className="text-xs text-amber-700">Primero debes registrar un vehículo.</span>}
          </label>
          <label className="space-y-1.5"><span className="text-sm font-medium text-slate-700">Aseguradora *</span><input value={form.aseguradora} onChange={(e) => update("aseguradora", e.target.value)} aria-invalid={Boolean(errors.aseguradora)} placeholder="Ej. Nacional Seguros" className={inputClass(Boolean(errors.aseguradora))} />{errors.aseguradora && <span className="block text-xs font-medium text-red-600">{errors.aseguradora}</span>}</label>
          <label className="space-y-1.5"><span className="text-sm font-medium text-slate-700">Número de póliza *</span><input value={form.numeroPoliza} onChange={(e) => update("numeroPoliza", e.target.value)} aria-invalid={Boolean(errors.numeroPoliza)} placeholder="Ej. POL-2026-001" className={inputClass(Boolean(errors.numeroPoliza))} />{errors.numeroPoliza && <span className="block text-xs font-medium text-red-600">{errors.numeroPoliza}</span>}</label>
          <label className="space-y-1.5 sm:col-span-2"><span className="text-sm font-medium text-slate-700">Tipo de cobertura *</span>
            <select value={form.tipoCobertura} onChange={(e) => update("tipoCobertura", e.target.value)} aria-invalid={Boolean(errors.tipoCobertura)} className={inputClass(Boolean(errors.tipoCobertura))}><option value="">Seleccionar cobertura</option><option>Responsabilidad civil</option><option>Todo riesgo</option><option>Daños a terceros</option><option>Robo total</option></select>{errors.tipoCobertura && <span className="block text-xs font-medium text-red-600">{errors.tipoCobertura}</span>}
          </label>
          <label className="space-y-1.5"><span className="text-sm font-medium text-slate-700">Fecha de inicio *</span><input type="date" value={form.fechaInicio} onChange={(e) => update("fechaInicio", e.target.value)} aria-invalid={Boolean(errors.fechaInicio)} className={inputClass(Boolean(errors.fechaInicio))} />{errors.fechaInicio && <span className="block text-xs font-medium text-red-600">{errors.fechaInicio}</span>}</label>
          <label className="space-y-1.5"><span className="text-sm font-medium text-slate-700">Fecha de vencimiento *</span><input type="date" min={form.fechaInicio} value={form.fechaVencimiento} onChange={(e) => update("fechaVencimiento", e.target.value)} aria-invalid={Boolean(errors.fechaVencimiento)} className={inputClass(Boolean(errors.fechaVencimiento))} />{errors.fechaVencimiento && <span className="block text-xs font-medium text-red-600">{errors.fechaVencimiento}</span>}</label>
          <label className="space-y-1.5"><span className="text-sm font-medium text-slate-700">Monto asegurado (Bs) *</span><input type="number" min="0.01" step="0.01" value={form.montoAsegurado} onChange={(e) => update("montoAsegurado", e.target.value)} aria-invalid={Boolean(errors.montoAsegurado)} className={inputClass(Boolean(errors.montoAsegurado))} />{errors.montoAsegurado && <span className="block text-xs font-medium text-red-600">{errors.montoAsegurado}</span>}</label>
          <label className="space-y-1.5"><span className="text-sm font-medium text-slate-700">Costo de prima (Bs) *</span><input type="number" min="0.01" step="0.01" value={form.costoPrima} onChange={(e) => update("costoPrima", e.target.value)} aria-invalid={Boolean(errors.costoPrima)} className={inputClass(Boolean(errors.costoPrima))} />{errors.costoPrima && <span className="block text-xs font-medium text-red-600">{errors.costoPrima}</span>}</label>
          <label className="space-y-1.5 sm:col-span-2"><span className="text-sm font-medium text-slate-700">Observaciones</span><textarea rows={3} value={form.observaciones} onChange={(e) => update("observaciones", e.target.value)} placeholder="Información adicional de la póliza" className={inputClass()} /></label>
        </div>

        <div className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-slate-200 bg-white p-4 sm:flex-row sm:justify-end sm:px-6">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancelar</button>
          <button type="submit" disabled={vehiculos.length === 0} className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">{seguro ? "Guardar cambios" : "Registrar seguro"}</button>
        </div>
      </form>
    </div>
  );
}
