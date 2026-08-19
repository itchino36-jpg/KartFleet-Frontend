"use client";

import { AlertTriangleIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import PlanillaSummary from "@/components/planilla/PlanillaSummary";
import PlanillaTable from "@/components/planilla/PlanillaTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { planillaDetalle } from "@/modules/planilla/data/planilla.mock";
import { getPlanillaEntryTotals } from "@/modules/planilla/services/planilla-entries.service";

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
  const [planillas, setPlanillas] = useState(planillaDetalle);
  const itemsPerPage = 3;

  useEffect(() => {
    queueMicrotask(() => setPlanillas(planillaDetalle.map((planilla) => {
      const totals = getPlanillaEntryTotals(planilla.id);
      return {
        ...planilla,
        ingresos: totals.hasIncomeEntries ? totals.ingresos : planilla.ingresos,
        egresos: totals.hasExpenseEntries ? totals.egresos : planilla.egresos,
        totalCarreras: totals.hasIncomeEntries ? totals.totalCarreras : planilla.totalCarreras,
      };
    })));
  }, []);

  const totalPlanillas = planillas.length;
  const enProceso = planillas.filter((item) => item.estado === "En proceso").length;
  const balance = planillas.reduce(
    (accumulator, planilla) => accumulator + planilla.ingresos - planilla.egresos - planilla.combustible,
    0,
  );
  const totalCarreras = planillas.reduce((accumulator, planilla) => accumulator + planilla.totalCarreras, 0);
  const ingresos = planillas.reduce((accumulator, planilla) => accumulator + planilla.ingresos, 0);
  const egresos = planillas.reduce((accumulator, planilla) => accumulator + planilla.egresos, 0);
  const combustible = planillas.reduce((accumulator, planilla) => accumulator + planilla.combustible, 0);
  const totalHorasTrabajadas = planillas.reduce(
    (accumulator, planilla) => accumulator + parseFloat(planilla.horasTrabajadas),
    0,
  );


  const totalPages = Math.max(1, Math.ceil(totalPlanillas / itemsPerPage));
  const today = useMemo(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }, []);

  const inProgressPlanilla = useMemo(() => {
    return planillas.find((planilla) => planilla.estado === "En proceso") ?? null;
  }, [planillas]);

  const expiredPlanilla = useMemo(() => {
    if (!inProgressPlanilla) {
      return null;
    }

    return parseSpanishDate(inProgressPlanilla.fecha) < today ? inProgressPlanilla : null;
  }, [inProgressPlanilla, today]);

  const visiblePlanillas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return planillas.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, planillas]);

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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mx-auto w-full max-w-7xl space-y-6 pb-8">
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-lg shadow-slate-950/10 md:p-7">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10 bg-white/[0.03]" />
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

      <AnimatePresence>{showBlockAlert && inProgressPlanilla && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><Alert className="max-w-full border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
          <AlertTriangleIcon />
          <AlertTitle>Planilla en proceso</AlertTitle>
          <AlertDescription>{blockingAlertMessage}</AlertDescription>
        </Alert></motion.div>
      )}</AnimatePresence>

      <PlanillaSummary
        totalPlanillas={totalPlanillas}
        enProceso={enProceso}
        balance={balance}
        horasTrabajadas={`${totalHorasTrabajadas.toFixed(1)} h`}
        totalCarreras={totalCarreras}
        ingresos={ingresos}
        egresos={egresos}
        combustible={combustible}
      />

      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
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
    </motion.div>
  );
}
