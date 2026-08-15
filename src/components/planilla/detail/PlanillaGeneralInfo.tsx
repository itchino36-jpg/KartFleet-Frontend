import { Planilla } from "@/modules/planilla/types/planilla.types";
import { money } from "@/modules/planilla/constants/format.constants";

type Props = {
  planilla: Planilla;
  balance: number;
};

export default function PlanillaGeneralInfo({
  planilla,
  balance,
}: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Conductor
        </p>

        <p className="mt-2 text-lg font-semibold text-slate-950">
          {planilla.conductor}
        </p>

        <p className="text-sm text-slate-600">
          Móvil {planilla.movil}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Fecha
        </p>

        <p className="mt-2 text-lg font-semibold text-slate-950">
          {planilla.fecha}
        </p>

        <p className="text-sm text-slate-600">
          Estado: {planilla.estado}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Carreras
        </p>

        <p className="mt-2 text-lg font-semibold text-slate-950">
          {planilla.totalCarreras}
        </p>

        <p className="text-sm text-slate-600">
          Ingreso por carrera:
          {money.format(planilla.ingresoPorCarrera)}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Balance
        </p>

        <p className="mt-2 text-lg font-semibold text-slate-950">
          {money.format(balance)}
        </p>

        <p className="text-sm text-slate-600">
          Ingresos netos del turno
        </p>
      </div>
    </section>
  );
}
