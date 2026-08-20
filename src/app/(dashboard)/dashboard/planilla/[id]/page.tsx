"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { AnimatePresence, motion } from "motion/react";

import PlanillaDetailHeader from "@/components/planilla/detail/PlanillaDetailHeader";
import PlanillaModuleSelector from "@/components/planilla/detail/PlanillaModuleSelector";
import PlanillaModuleContent from "@/components/planilla/detail/PlanillaModuleContent";
import PlanillaRegisterModal from "@/components/planilla/detail/PlanillaRegisterModal";
import PlanillaDetailContent from "@/components/planilla/detail/PlanillaDetailContent";
import PlanillaModuleFormRenderer from "@/components/planilla/detail/PlanillaModuleFormRenderer";

import type { FuelHistoryEntry } from "@/modules/planilla/forms/FuelManagement";
import type { HoursHistoryEntry } from "@/modules/planilla/forms/TimeTracking";
import type { IncomeHistoryEntry } from "@/modules/planilla/forms/OperationalIncome";
import type { ExpenseHistoryEntry } from "@/modules/planilla/forms/OperationalExpenses";
import type { ActivityLogEntry } from "@/modules/planilla/forms/OperationsLog";

import { planillaDetalle } from "@/modules/planilla/data/planilla.mock";
import { accordionItems } from "@/modules/planilla/constants/planilla.constants";
import { usePlanillaEntries } from "@/modules/planilla/hooks/use-planilla-entries";

type PlanillaHistoryEntry =
  | HoursHistoryEntry
  | IncomeHistoryEntry
  | ExpenseHistoryEntry
  | ActivityLogEntry
  | FuelHistoryEntry;

export default function PlanillaDetailPage() {
  const { id } = useParams<{ id: string }>();

  const planilla = planillaDetalle.find(
    (item) => item.id === id
  );
  const isFinalized = planilla?.estado === "Finalizada";

  const [selectedSection, setSelectedSection] =
    useState("hours-tracking");

  const [activeModal, setActiveModal] =
    useState<string | null>(null);

  const {
    entries,
    addHoursEntry,
    addIncomeEntry,
    addExpenseEntry,
    addActivityLogEntry,
    addFuelEntry,
  } = usePlanillaEntries(planilla?.id ?? "", isFinalized);

  if (!planilla) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-950">
            Planilla no encontrada
          </h1>

          <Link
            href="/dashboard/planilla"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al historial
          </Link>
        </div>
      </div>
    );
  }

  const modalItem =
    accordionItems.find(
      (item) => item.id === activeModal
    ) ?? null;

  const handleSelectSection = (id: string) => {
    setSelectedSection(id);
    setActiveModal(null);
  };

  const handleRegisterSaved = (
    entry: PlanillaHistoryEntry
  ) => {
    if (isFinalized) {
      toast.error("Esta planilla está finalizada y no admite nuevos registros.");
      setActiveModal(null);
      return;
    }
    switch (activeModal) {
      case "hours-tracking":
        addHoursEntry(entry as HoursHistoryEntry);

        toast.success(
          "Registro de horas creado correctamente"
        );
        break;

      case "operating-income":
        addIncomeEntry(entry as IncomeHistoryEntry);

        toast.success(
          "Ingreso operativo creado correctamente"
        );
        break;

      case "operating-expenses":
        addExpenseEntry(entry as ExpenseHistoryEntry);

        toast.success(
          "Egreso operativo creado correctamente"
        );
        break;

      case "operations-log":
        addActivityLogEntry(entry as ActivityLogEntry);

        toast.success(
          "Actividad de bitácora creada correctamente"
        );
        break;

      case "fuel-management":
        addFuelEntry(entry as FuelHistoryEntry);

        toast.success(
          "Registro de combustible creado correctamente"
        );
        break;
          }

    setActiveModal(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} className="mx-auto w-full max-w-7xl space-y-5 pb-8">

      <PlanillaDetailHeader
        planilla={planilla}
      />

      <div className="sticky top-3 z-20"><PlanillaModuleSelector items={accordionItems} selectedSection={selectedSection} onSelect={handleSelectSection} /></div>

      {/* CONTENIDO DEL MÓDULO */}

      {isFinalized && <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><strong>Planilla finalizada.</strong> Los datos están cerrados y disponibles únicamente para consulta.</div>}
      <AnimatePresence mode="wait"><motion.div key={`heading-${selectedSection}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .2 }}><PlanillaModuleContent selectedSection={selectedSection} readOnly={isFinalized} onAdd={isFinalized ? undefined : () => setActiveModal(selectedSection)} /></motion.div></AnimatePresence>

      {/* CONTENIDO DINÁMICO DE LA PLANILLA */}

      <AnimatePresence mode="wait"><motion.div key={selectedSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .22 }} className="max-h-[560px] overflow-auto overscroll-contain rounded-2xl [scrollbar-color:#94a3b8_transparent] [scrollbar-width:thin]"><PlanillaDetailContent selectedSection={selectedSection} hoursEntries={entries.hoursEntries} incomeEntries={entries.incomeEntries} expenseEntries={entries.expenseEntries} activityLogEntries={entries.activityLogEntries} fuelEntries={entries.fuelEntries} /></motion.div></AnimatePresence>

      {/* MODAL PARA AGREGAR REGISTROS */}

      <PlanillaRegisterModal
        open={!!modalItem && !isFinalized}
        title={modalItem?.title ?? ""}
        onClose={() => setActiveModal(null)}
      >
        <PlanillaModuleFormRenderer
          moduleId={activeModal ?? ""}
          onSaved={handleRegisterSaved}
          vehicleType={planilla.tipoVehiculo}
        />
      </PlanillaRegisterModal>
    </motion.div>
  );
}
