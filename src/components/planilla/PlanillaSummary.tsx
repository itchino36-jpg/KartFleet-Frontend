import {
  CircleDollarSign,
  Clock3,
  Fuel,
  Route,
  Wallet,
} from "lucide-react";

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

const money = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

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
          <div
            key={metric.label}
            className="card-elevated flex items-center gap-3 bg-white p-4"
          >
            <div className="rounded-xl bg-white p-2.5 text-slate-950 shadow-sm">
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="text-lg font-semibold text-slate-950 tabular-nums">
                {metric.value}
              </p>
            </div>
          </div>
        );
      })}

      <div className="col-span-full flex items-center justify-between gap-4 rounded-2xl bg-[#151310] p-5 text-white shadow-sm">
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
      </div>
    </div>
  );
}
