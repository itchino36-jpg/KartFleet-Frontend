"use client";

import { motion } from "motion/react";
import {
  CircleDollarSign,
  Clock3,
  Fuel,
  Route,
  Wallet,
} from "lucide-react";
import { money } from "@/modules/planilla/constants/format.constants";

interface PlanillaSummaryProps {
  totalPlanillas: number;
  enProceso: number;
  balance: number;
  horasTrabajadas: string;
  totalCarreras: number;
  ingresos: number;
  egresos: number;
  combustible: number;
}

export default function PlanillaSummary({
  totalPlanillas,
  enProceso,
  balance,
  horasTrabajadas,
  totalCarreras,
  ingresos,
  egresos,
  combustible,
}: PlanillaSummaryProps) {
  const metrics = [
    {
      label: "Planillas",
      value: totalPlanillas,
      icon: Route,
    },
    {
      label: "En proceso",
      value: enProceso,
      icon: Clock3,
    },
    {
      label: "Horas trabajadas",
      value: horasTrabajadas,
      icon: Clock3,
    },
    {
      label: "Carreras",
      value: totalCarreras,
      icon: Route,
    },
    {
      label: "Ingresos",
      value: money.format(ingresos),
      icon: CircleDollarSign,
    },
    {
      label: "Egresos",
      value: money.format(egresos),
      icon: Wallet,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: metrics.indexOf(metric) * 0.05 }} whileHover={{ y: -3 }}
            className="group card-elevated flex items-center gap-3 bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-950 transition group-hover:bg-slate-950 group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="text-lg font-semibold text-slate-950 tabular-nums">
                {metric.value}
              </p>
            </div>
          </motion.div>
        );
      })}

      <motion.div initial={{ opacity: 0, scale: .99 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .25 }} className="col-span-full flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl bg-slate-950 p-5 text-white shadow-lg sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-300">Balance del turno</p>
          <p className="text-2xl font-semibold tabular-nums text-white">
            {money.format(balance)}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
          <Fuel className="h-4 w-4 text-white" />
          <span>{money.format(combustible)} combustible</span>
        </div>
      </motion.div>
    </div>
  );
}
