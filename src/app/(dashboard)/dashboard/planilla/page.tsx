"use client";

import { AlertTriangleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PlanillaSummary from "@/components/planilla/PlanillaSummary";
import PlanillaTable from "@/components/planilla/PlanillaTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { planillaDetalle } from "@/modules/planilla/data/planilla.mock";

const monthMap: Record<string, number> = {
  Ene: 0,
  Feb: 1,
  Mar: 2,
  Abr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Ago: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dic: 11,
};

const parseSpanishDate = (value: string) => {
  const [dayPart, monthPart, yearPart] = value.split(" ");
  const day = Number(dayPart);
  const month = monthMap[monthPart] ?? 0;
  const year = Number(yearPart);

  return new Date(year, month, day);
};

export default function PlanillaPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [showBlockAlert, setShowBlockAlert] = useState(false);
  const itemsPerPage = 3;

  const totalPlanillas = planillaDetalle.length;
  const enProceso = planillaDetalle.filter((item) => item.estado === "En proceso").length;
  const balance = planillaDetalle.reduce(
    (accumulator, planilla) => accumulator + planilla.ingresos - planilla.egresos - planilla.combustible,
    0,
  );
  const totalCarreras = planillaDetalle.reduce((accumulator, planilla) => accumulator + planilla.totalCarreras, 0);
  const ingresos = planillaDetalle.reduce((accumulator, planilla) => accumulator + planilla.ingresos, 0);
  const egresos = planillaDetalle.reduce((accumulator, planilla) => accumulator + planilla.egresos, 0);
  const combustible = planillaDetalle.reduce((accumulator, planilla) => accumulator + planilla.combustible, 0);

  const totalPages = Math.max(1, Math.ceil(totalPlanillas / itemsPerPage));
  const today = useMemo(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }, []);

  const inProgressPlanilla = useMemo(() => {
    return planillaDetalle.find((planilla) => planilla.estado === "En proceso") ?? null;
  }, []);

  const expiredPlanilla = useMemo(() => {
    if (!inProgressPlanilla) {
      return null;
    }

    return parseSpanishDate(inProgressPlanilla.fecha) < today ? inProgressPlanilla : null;
  }, [inProgressPlanilla, today]);

  const visiblePlanillas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return planillaDetalle.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage]);

  const handleCreatePlanilla = () => {
    if (inProgressPlanilla) {
      setShowBlockAlert(true);
      return;
    }

    setShowBlockAlert(false);
    router.push("/dashboard/planilla/nueva");
  };

  const blockingAlertMessage = expiredPlanilla
    ? `Tienes una planilla en proceso vencida (${expiredPlanilla.folio}). Finalízala antes de crear una nueva planilla.`
    : `Ya existe una planilla en proceso (${inProgressPlanilla?.folio ?? "PL-001"}). Finalízala antes de crear una nueva planilla.`;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 bg-white px-2 py-2 md:px-4">
      <div className="overflow-hidden rounded-3xl bg-[#151310] p-5 text-white shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-300">FlotaControl / Planillas</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">Gestión de planillas</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Historial de turnos, estado de cada planilla y acceso rápido para continuar o finalizar.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreatePlanilla}
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            + Crear planilla
          </button>
        </div>
      </div>

      {showBlockAlert && inProgressPlanilla && (
        <Alert className="max-w-full border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
          <AlertTriangleIcon />
          <AlertTitle>Planilla en proceso</AlertTitle>
          <AlertDescription>{blockingAlertMessage}</AlertDescription>
        </Alert>
      )}

      <PlanillaSummary
        totalPlanillas={totalPlanillas}
        enProceso={enProceso}
        balance={balance}
        horasTrabajadas="25.5 h"
        totalCarreras={totalCarreras}
        ingresos={ingresos}
        egresos={egresos}
        combustible={combustible}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Historial</h2>
            <p className="text-sm text-slate-500">
              Mostrando las planillas más recientes, paginadas para mantener el panel estable.
            </p>
          </div>
        </div>

        <PlanillaTable planillas={visiblePlanillas} />

        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-sm text-slate-600">
              Página {currentPage} de {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-lg bg-slate-950 px-3 py-1.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}