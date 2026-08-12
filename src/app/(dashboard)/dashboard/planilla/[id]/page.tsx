"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "@/components/ui/toast";

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

  const [selectedSection, setSelectedSection] =
    useState("hours-tracking");

  const [activeModal, setActiveModal] =
    useState<string | null>(null);

  const [incomeEntries, setIncomeEntries] =
    useState<IncomeHistoryEntry[]>([]);

  const [expenseEntries, setExpenseEntries] =
    useState<ExpenseHistoryEntry[]>([]);

  const [activityLogEntries, setActivityLogEntries] =
    useState<ActivityLogEntry[]>([]);

  const [hoursEntries, setHoursEntries] =
    useState<HoursHistoryEntry[]>([]);

  const [fuelEntries, setFuelEntries] =
    useState<FuelHistoryEntry[]>([]);

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
    switch (activeModal) {
      case "hours-tracking":
        setHoursEntries((prev) => [
          ...prev,
          entry as HoursHistoryEntry,
        ]);

        toast.success(
          "Registro de horas creado correctamente"
        );
        break;

      case "operating-income":
        setIncomeEntries((prev) => [
          ...prev,
          entry as IncomeHistoryEntry,
        ]);

        toast.success(
          "Ingreso operativo creado correctamente"
        );
        break;

      case "operating-expenses":
        setExpenseEntries((prev) => [
          ...prev,
          entry as ExpenseHistoryEntry,
        ]);

        toast.success(
          "Egreso operativo creado correctamente"
        );
        break;

      case "operations-log":
        setActivityLogEntries((prev) => [
          ...prev,
          entry as ActivityLogEntry,
        ]);

        toast.success(
          "Actividad de bitácora creada correctamente"
        );
        break;

      case "fuel-management":
        setFuelEntries((prev) => [
          ...prev,
          entry as FuelHistoryEntry,
        ]);

        toast.success(
          "Registro de combustible creado correctamente"
        );
        break;
          }

    setActiveModal(null);
  };

  return (
    <div className="space-y-6">
      {/* ENCABEZADO */}

      <PlanillaDetailHeader
        planilla={planilla}
      />

      {/* SELECTOR DE MÓDULOS */}

      <PlanillaModuleSelector
        items={accordionItems}
        selectedSection={selectedSection}
        onSelect={handleSelectSection}
      />

      {/* CONTENIDO DEL MÓDULO */}

      <PlanillaModuleContent
        selectedSection={selectedSection}
        onAdd={() =>
          setActiveModal(selectedSection)
        }
      />

      {/* CONTENIDO DINÁMICO DE LA PLANILLA */}

      <PlanillaDetailContent
        selectedSection={selectedSection}
        hoursEntries={hoursEntries}
        incomeEntries={incomeEntries}
        expenseEntries={expenseEntries}
        activityLogEntries={activityLogEntries}
        fuelEntries={fuelEntries}
      />

      {/* MODAL PARA AGREGAR REGISTROS */}

      <PlanillaRegisterModal
        open={!!modalItem}
        title={modalItem?.title ?? ""}
        onClose={() => setActiveModal(null)}
      >
        <PlanillaModuleFormRenderer
          moduleId={activeModal ?? ""}
          onSaved={handleRegisterSaved}
        />
      </PlanillaRegisterModal>
    </div>
  );
}