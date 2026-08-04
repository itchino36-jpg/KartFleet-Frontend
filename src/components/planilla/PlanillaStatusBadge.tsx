import { CheckCircle2, LoaderCircle } from "lucide-react";
import type { PlanillaStatus } from "@/modules/planilla/types/planilla.types";

interface PlanillaStatusBadgeProps {
  estado: PlanillaStatus;
}

export default function PlanillaStatusBadge({
  estado,
}: PlanillaStatusBadgeProps) {
  const isInProgress = estado === "En proceso";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        isInProgress ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950"
      }`}
    >
      {isInProgress ? (
        <LoaderCircle className="h-3.5 w-3.5 animate-spin text-white" />
      ) : (
        <CheckCircle2 className="h-3.5 w-3.5 text-slate-950" />
      )}
      {estado}
    </span>
  );
}
