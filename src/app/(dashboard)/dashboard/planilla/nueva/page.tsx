"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import FuelManagement from "../form/FuelManagement";
import OperatingExpenses from "../form/OperationalExpenses";
import OperationalIncome from "../form/OperationalIncome";
import OperationLog from "../form/OperationsLog";
import HoursTracking from "../form/Time-Tracking";
import TripTracking from "../form/Trip-Tracking";
import PlanillaStatusBadge from "@/components/planilla/PlanillaStatusBadge";

const accordionItems: Array<{
  id: string;
  title: string;
  description: string;
  content: ReactNode;
}> = [
  {
    id: "hours-tracking",
    title: "Control Horas",
    description: "1 registro por planilla",
    content: <HoursTracking />,
  },
  {
    id: "trip-tracking",
    title: "Control Carreras",
    description: "1 registro por planilla",
    content: <TripTracking />,
  },
  {
    id: "operating-income",
    title: "Ingresos Operativos",
    description: "Varios registros",
    content: <OperationalIncome />,
  },
  {
    id: "operating-expenses",
    title: "Egresos Operativos",
    description: "Varios registros",
    content: <OperatingExpenses />,
  },
  {
    id: "operations-log",
    title: "Bitácora Operativa",
    description: "Varios registros",
    content: <OperationLog />,
  },
  {
    id: "fuel-management",
    title: "Control Combustible",
    description: "Varios registros",
    content: <FuelManagement />,
  },
];

export default function NewPlanillaPage() {
  const [openItem, setOpenItem] = useState<string | null>("hours-tracking");

  return (
    <div className="space-y-5">
      <div className="card-elevated surface-deep-gradient overflow-hidden p-5 text-white md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-white/80">FlotaControl / Planillas / Nueva</p>
            <h1 className="mt-1 text-2xl font-semibold">Nueva planilla</h1>
          </div>

          <PlanillaStatusBadge estado="En proceso" />
        </div>
      </div>

      <div className="space-y-3">
        {accordionItems.map((item) => {
          const isOpen = openItem === item.id;

          return (
            <section
              key={item.id}
              className="card-elevated overflow-hidden"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenItem((current) => (current === item.id ? null : item.id))
                }
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-muted/40 md:px-6"
              >
                <div>
                  <h2 className="text-base font-semibold text-foreground md:text-lg">
                    {item.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>

                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                  {isOpen ? "Cerrar" : "Abrir"}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-border bg-muted/30 p-3 md:p-4">
                  {item.content}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
