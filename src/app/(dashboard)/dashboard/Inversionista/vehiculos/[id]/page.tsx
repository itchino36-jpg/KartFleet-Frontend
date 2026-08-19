"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Eye, ShieldCheck } from "lucide-react";
import { useVehiculos } from "@/modules/inversionista/hooks/use-vehiculos";
import { useSeguros } from "@/modules/seguros/hooks/use-seguros";
import { formatDate, formatMoney } from "@/modules/seguros/utils/seguro.utils";

export default function VehiculoDetailPage() {
  const { id } = useParams<{ id: string }>(); const { vehiculos, isLoading: loadingVehicles } = useVehiculos(); const { seguros, isLoading, error } = useSeguros(); const vehicle = vehiculos.find((v) => v.id === id); const history = seguros.filter((s) => s.vehiculoId === id).sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio));
  if (loadingVehicles || isLoading) return <div className="space-y-4">{[1,2,3].map((i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-slate-100" />)}</div>;
  if (!vehicle) return <div className="rounded-2xl border bg-white p-10 text-center"><p>El vehículo no existe.</p><Link href="/dashboard/Inversionista/vehiculos" className="mt-4 inline-block underline">Volver</Link></div>;
  return <div className="mx-auto max-w-7xl space-y-6"><header><Link href="/dashboard/Inversionista/vehiculos" className="inline-flex items-center gap-2 text-sm"><ArrowLeft className="h-4 w-4" />Volver</Link><h1 className="mt-4 text-2xl font-semibold">Vehículo {vehicle.placa}</h1><p className="text-sm text-slate-500">{vehicle.marca} {vehicle.modelo}</p></header><section className="rounded-2xl border bg-white p-6"><h2 className="flex items-center gap-2 text-lg font-semibold"><ShieldCheck className="h-5 w-5" />Historial de seguros</h2>{error ? <p className="mt-6 text-red-700">{error}</p> : !history.length ? <div className="mt-6 rounded-xl border border-dashed p-10 text-center text-slate-500">Este vehículo no tiene seguros registrados.</div> : <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[900px] text-sm"><thead className="bg-slate-50 text-left"><tr>{["Aseguradora", "N° de póliza", "Valor asegurado", "Franquicia", "Fecha inicio", "Fecha fin", "Detalle"].map((h) => <th key={h} className="px-3 py-3">{h}</th>)}</tr></thead><tbody className="divide-y">{history.map((s) => <tr key={s.id}><td className="px-3 py-3">{s.aseguradora}</td><td className="px-3 py-3">{s.numeroPoliza || "—"}</td><td className="px-3 py-3">{formatMoney(s.valorAsegurado)}</td><td className="px-3 py-3">{formatMoney(s.franquicia)}</td><td className="px-3 py-3">{formatDate(s.fechaInicio)}</td><td className="px-3 py-3">{formatDate(s.fechaFin)}</td><td className="px-3 py-3"><Link href={`/dashboard/seguros?detalle=${s.id}`} aria-label="Ver detalle del seguro"><Eye className="h-4 w-4" /></Link></td></tr>)}</tbody></table></div>}</section></div>;
}
