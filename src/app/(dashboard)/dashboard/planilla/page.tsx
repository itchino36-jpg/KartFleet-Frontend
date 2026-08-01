"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import FuelManagement from "./form/FuelManagement";
import OperatingExpenses from "./form/OperationalExpenses";
import OperationalIncome from "./form/OperationalIncome";
import OperationLog from "./form/OperationsLog";
import HoursTracking from "./form/Time-Tracking";
import TripTracking from "./form/Trip-Tracking";

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

export default function FormPage() {
  const [openItem, setOpenItem] = useState<string | null>("hours-tracking");

  return (
    <div className="space-y-3">
      {accordionItems.map((item) => {
        const isOpen = openItem === item.id;

        return (
          <section
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() =>
                setOpenItem((current) => (current === item.id ? null : item.id))
              }
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-slate-50 md:px-6"
            >
              <div>
                <h2 className="text-base font-semibold text-slate-900 md:text-lg">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-500">{item.description}</p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {isOpen ? "Cerrar" : "Abrir"}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-slate-200 bg-slate-50 p-3 md:p-4">
                {item.content}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}