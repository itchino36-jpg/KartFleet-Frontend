"use client";

import {useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

import PlanillaDetailHeader from "@/components/planilla/detail/PlanillaDetailHeader";
import PlanillaGeneralInfo from "@/components/planilla/detail/PlanillaGeneralInfo";
import PlanillaModuleSelector from "@/components/planilla/detail/PlanillaModuleSelector";
import PlanillaModuleContent from "@/components/planilla/detail/PlanillaModuleContent";
import PlanillaFinancialSummary from "@/components/planilla/detail/PlanillaFinancialSummary";
import PlanillaFuelSummary from "@/components/planilla/detail/PlanillaFuelSummary";
import PlanillaExpenseSummary from "@/components/planilla/detail/PlanillaExpenseSummary";
import PlanillaLogSummary from "@/components/planilla/detail/PlanillaLogSummary";
import PlanillaRegisterModal from "@/components/planilla/detail/PlanillaRegisterModal";
import PlanillaModuleFormRenderer from "@/components/planilla/detail/PlanillaModuleFormRenderer";

import { planillaDetalle } from "@/modules/planilla/data/planilla.mock";
import { accordionItems } from "@/modules/planilla/constants/planilla.constants";
import { money } from "@/modules/planilla/constants/format.constants";


export default function PlanillaDetailPage() {
  const { id } = useParams<{ id:string }>();

  const planilla = planillaDetalle.find(
    item => item.id === id
  );

  const [selectedSection, setSelectedSection] =
    useState<string>("hours-tracking");

  const [activeModal, setActiveModal] =
    useState<string | null>(null);

  if (!planilla) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-950">
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

  const balance =
    planilla.ingresos -
    planilla.egresos -
    planilla.combustible;

  const handleSelectSection = (id: string) => {
    setSelectedSection(id);
    setActiveModal(null);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-2 py-2 md:px-4">

      <PlanillaDetailHeader
        planilla={planilla}
      />

      <PlanillaGeneralInfo
        planilla={planilla}
        balance={balance}
      />

      <PlanillaModuleSelector
        items={accordionItems}
        selectedSection={selectedSection}
        onSelect={handleSelectSection}
      />

      <PlanillaModuleContent
        selectedSection={selectedSection}
        showForm={false}
        onAdd={() =>
          setActiveModal(selectedSection)
        }
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <PlanillaFinancialSummary
          planilla={planilla}
          money={money}
        />
        <PlanillaFuelSummary
          planilla={planilla}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PlanillaExpenseSummary
          expenses={planilla.gastos}
          money={money}
        />
        <PlanillaLogSummary
          items={planilla.bitacora}
        />
      </section>

      <PlanillaRegisterModal
        open={!!modalItem}
        title={modalItem?.title ?? ""}
        onClose={() =>
          setActiveModal(null)
        }
      >
        <PlanillaModuleFormRenderer
          moduleId={activeModal ?? ""}
        />
      </PlanillaRegisterModal>
    </div>
  );
}
