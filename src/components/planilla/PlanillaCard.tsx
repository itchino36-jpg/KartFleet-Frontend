import Link from "next/link";
import {
  CircleDollarSign,
  Clock3,
  Fuel,
  Route,
  Wallet,
} from "lucide-react";
import PlanillaStatusBadge from "./PlanillaStatusBadge";
import { money } from "@/modules/planilla/constants/format.constants";

interface PlanillaCardProps {
  planilla: {
    id: string;
    folio: string;
    fecha: string;
    conductor: string;
    movil: string;
    estado: "En proceso" | "Finalizada";
    horasTrabajadas: string;
    horasNoTrabajadas: string;
    totalCarreras: number;
    ingresos: number;
    egresos: number;
    combustible: number;
  };
}

export default function PlanillaCard({ planilla }: PlanillaCardProps) {
  const metrics = [
    { label: "Horas", value: planilla.horasTrabajadas, icon: Clock3 },
    { label: "Carreras", value: planilla.totalCarreras, icon: Route },
    { label: "Ingresos", value: money.format(planilla.ingresos), icon: CircleDollarSign },
    { label: "Egresos", value: money.format(planilla.egresos), icon: Wallet },
    { label: "Combustible", value: money.format(planilla.combustible), icon: Fuel },
  ];

  return (
    <article className="card-elevated flex flex-col gap-3 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {planilla.folio}
            </p>
            <h3 className="text-base font-semibold text-slate-950">{planilla.fecha}</h3>
            <p className="text-sm text-slate-600">
              {planilla.conductor} • Móvil {planilla.movil}
            </p>
          </div>

          <PlanillaStatusBadge estado={planilla.estado} />
        </div>

        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
              >
                <Icon className="h-3.5 w-3.5 text-slate-950" />
                <span className="tabular-nums">{metric.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex shrink-0 justify-end">
        <Link
          href={
            planilla.estado === "En proceso"
              ? "/dashboard/planilla/nueva"
              : `/dashboard/planilla/${planilla.id}`
          }
          className="inline-flex items-center rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {planilla.estado === "En proceso" ? "Continuar" : "Ver resumen"}
        </Link>
      </div>
    </article>
  );
}
