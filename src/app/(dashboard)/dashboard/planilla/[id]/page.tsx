
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
import PlanillaModuleFormRenderer from "@/components/planilla/detail/PlanillaModuleFormRenderer";
import HoursHistory from "@/components/planilla/history/HoursHistory";

import type { TripHistoryEntry } from "@/modules/planilla/forms/TripTracking";
import TripHistory from "@/components/planilla/history/TripHistory";

import { planillaDetalle } from "@/modules/planilla/data/planilla.mock";
import { accordionItems } from "@/modules/planilla/constants/planilla.constants";

export default function PlanillaDetailPage() {
  const { id } = useParams<{ id: string }>();

  const planilla = planillaDetalle.find(
    (item) => item.id === id
  );

  const [selectedSection, setSelectedSection] =
    useState<string>("hours-tracking");

  const [activeModal, setActiveModal] =
    useState<string | null>(null);

  const [tripEntries, setTripEntries] =
    useState<TripHistoryEntry[]>([]);

  const [hoursEntries, setHoursEntries] = useState<any[]>([]);

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

  const handleSelectSection = (id: string) => {
    setSelectedSection(id);
    setActiveModal(null);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-2 py-2 md:px-4">

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
        showForm={false}
        onAdd={() =>
          setActiveModal(selectedSection)
        }
      /> 
      {selectedSection === "hours-tracking" && (
        <HoursHistory
          entries={hoursEntries}
        />
      )}
      {selectedSection === "trip-tracking" && (
        <TripHistory
          entries={tripEntries}
        />
      )}

      {/* MODAL PARA AGREGAR REGISTROS */}
      <PlanillaRegisterModal
        open={!!modalItem}
        title={modalItem?.title ?? ""}
        onClose={() => setActiveModal(null)}
      >
        <PlanillaModuleFormRenderer
          moduleId={activeModal ?? ""}
          onSaved={(entry) => {
            if (activeModal === "hours-tracking") {
              setHoursEntries((prev) => [
                ...prev,
                entry,
              ]);

              toast.success(
                "Registro de horas creado correctamente"
              );
            }

            if (activeModal === "trip-tracking") {
              setTripEntries((prev) => [
                ...prev,
                entry,
              ]);

              toast.success(
                "Registro de carreras creado correctamente"
              );
            }

            setActiveModal(null);
          }}
        />
      </PlanillaRegisterModal>

    </div>
  );
}
