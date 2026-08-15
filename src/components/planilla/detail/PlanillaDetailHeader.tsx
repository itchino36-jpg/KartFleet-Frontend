import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PlanillaStatusBadge from "../PlanillaStatusBadge";
import { PlanillaStatus } from "@/modules/planilla/types/planilla.types";

type Props = {
  planilla: {
    folio: string;
    estado: PlanillaStatus;
  };
};

export default function PlanillaDetailHeader({ planilla }: Props) {
  return (
    <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-300">
            FlotaControl / Planillas / {planilla.folio}
          </p>

          <h1 className="mt-1 text-3xl font-semibold">
            {planilla.folio}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Consulta y gestiona la información de esta planilla.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PlanillaStatusBadge estado={planilla.estado} />

          <Link
            href="/dashboard/planilla"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
