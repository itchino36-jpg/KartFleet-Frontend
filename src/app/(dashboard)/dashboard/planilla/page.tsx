"use client";

import { AlertTriangleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PlanillaCard from "@/components/planilla/PlanillaCard";
import PlanillaSummary from "@/components/planilla/PlanillaSummary";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const planillas = [
  {
    id: "PL-001",
    folio: "Folio PL-001",
    fecha: "01 Ago 2026",
    conductor: "Mario Chino",
    movil: "MC-12",
    horasTrabajadas: "8.5 h",
    horasNoTrabajadas: "1.5 h",
    totalCarreras: 18,
    ingresos: 2450,
    egresos: 520,
    combustible: 280,
    estado: "En proceso" as const,
  },
  {
    id: "PL-002",
    folio: "Folio PL-002",
    fecha: "31 Jul 2026",
    conductor: "Ana Torres",
    movil: "AT-07",
    horasTrabajadas: "9.0 h",
    horasNoTrabajadas: "1.0 h",
    totalCarreras: 20,
    ingresos: 2680,
    egresos: 610,
    combustible: 310,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-003",
    folio: "Folio PL-003",
    fecha: "30 Jul 2026",
    conductor: "Luis Pérez",
    movil: "LP-16",
    horasTrabajadas: "7.5 h",
    horasNoTrabajadas: "2.5 h",
    totalCarreras: 15,
    ingresos: 2100,
    egresos: 480,
    combustible: 240,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-004",
    folio: "Folio PL-004",
    fecha: "29 Jul 2026",
    conductor: "Sofía Rivas",
    movil: "SR-04",
    horasTrabajadas: "8.0 h",
    horasNoTrabajadas: "2.0 h",
    totalCarreras: 16,
    ingresos: 2250,
    egresos: 500,
    combustible: 260,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-005",
    folio: "Folio PL-005",
    fecha: "28 Jul 2026",
    conductor: "Diego Navarro",
    movil: "DN-19",
    horasTrabajadas: "7.0 h",
    horasNoTrabajadas: "3.0 h",
    totalCarreras: 14,
    ingresos: 1980,
    egresos: 470,
    combustible: 230,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-006",
    folio: "Folio PL-006",
    fecha: "27 Jul 2026",
    conductor: "Valeria Gómez",
    movil: "VG-08",
    horasTrabajadas: "9.5 h",
    horasNoTrabajadas: "0.5 h",
    totalCarreras: 22,
    ingresos: 2920,
    egresos: 640,
    combustible: 340,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-007",
    folio: "Folio PL-007",
    fecha: "26 Jul 2026",
    conductor: "Andrés Silva",
    movil: "AS-11",
    horasTrabajadas: "8.5 h",
    horasNoTrabajadas: "1.5 h",
    totalCarreras: 17,
    ingresos: 2350,
    egresos: 515,
    combustible: 275,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-008",
    folio: "Folio PL-008",
    fecha: "25 Jul 2026",
    conductor: "Camila Ortiz",
    movil: "CO-03",
    horasTrabajadas: "6.5 h",
    horasNoTrabajadas: "3.5 h",
    totalCarreras: 13,
    ingresos: 1840,
    egresos: 420,
    combustible: 210,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-009",
    folio: "Folio PL-009",
    fecha: "24 Jul 2026",
    conductor: "Tomás Vega",
    movil: "TV-22",
    horasTrabajadas: "9.0 h",
    horasNoTrabajadas: "1.0 h",
    totalCarreras: 21,
    ingresos: 2780,
    egresos: 590,
    combustible: 320,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-010",
    folio: "Folio PL-010",
    fecha: "23 Jul 2026",
    conductor: "Renata León",
    movil: "RL-14",
    horasTrabajadas: "7.5 h",
    horasNoTrabajadas: "2.5 h",
    totalCarreras: 15,
    ingresos: 2110,
    egresos: 485,
    combustible: 250,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-011",
    folio: "Folio PL-011",
    fecha: "22 Jul 2026",
    conductor: "Sebastián Cruz",
    movil: "SC-09",
    horasTrabajadas: "8.0 h",
    horasNoTrabajadas: "2.0 h",
    totalCarreras: 16,
    ingresos: 2260,
    egresos: 530,
    combustible: 270,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-012",
    folio: "Folio PL-012",
    fecha: "21 Jul 2026",
    conductor: "Paula Rojas",
    movil: "PR-15",
    horasTrabajadas: "7.0 h",
    horasNoTrabajadas: "3.0 h",
    totalCarreras: 14,
    ingresos: 1940,
    egresos: 450,
    combustible: 230,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-013",
    folio: "Folio PL-013",
    fecha: "20 Jul 2026",
    conductor: "Mateo Flores",
    movil: "MF-05",
    horasTrabajadas: "8.5 h",
    horasNoTrabajadas: "1.5 h",
    totalCarreras: 18,
    ingresos: 2440,
    egresos: 510,
    combustible: 275,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-014",
    folio: "Folio PL-014",
    fecha: "19 Jul 2026",
    conductor: "Nicolás Álvarez",
    movil: "NA-18",
    horasTrabajadas: "6.5 h",
    horasNoTrabajadas: "3.5 h",
    totalCarreras: 13,
    ingresos: 1800,
    egresos: 410,
    combustible: 205,
    estado: "Finalizada" as const,
  },
  {
    id: "PL-015",
    folio: "Folio PL-015",
    fecha: "18 Jul 2026",
    conductor: "Fernanda Salas",
    movil: "FS-10",
    horasTrabajadas: "9.5 h",
    horasNoTrabajadas: "0.5 h",
    totalCarreras: 23,
    ingresos: 3010,
    egresos: 665,
    combustible: 350,
    estado: "Finalizada" as const,
  },
];

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

  const totalPages = Math.max(1, Math.ceil(totalPlanillas / itemsPerPage));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inProgressPlanilla = useMemo(() => {
    return planillas.find((planilla) => planilla.estado === "En proceso") ?? null;
  }, []);

  const expiredPlanilla = useMemo(() => {
    if (!inProgressPlanilla) {
      return null;
    }

    return parseSpanishDate(inProgressPlanilla.fecha) < today ? inProgressPlanilla : null;
  }, [inProgressPlanilla, today]);

  const visiblePlanillas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return planillas.slice(startIndex, startIndex + itemsPerPage);
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

        <div className="space-y-3">
          {visiblePlanillas.map((planilla) => (
            <PlanillaCard key={planilla.id} planilla={planilla} />
          ))}
        </div>

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