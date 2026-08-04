import type {PlanillaModuleItem,} from "@/modules/planilla/types/planilla.types";


export const accordionItems: PlanillaModuleItem[] = [
  {
    id: "hours-tracking",
    title: "Horas",
    description: "1 registro por planilla",
  },
  {
    id: "trip-tracking",
    title: "Carreras",
    description: "1 registro por planilla",
  },
  {
    id: "operating-income",
    title: "Ingresos",
    description: "Varios registros",
  },
  {
    id: "operating-expenses",
    title: "Egresos",
    description: "Varios registros",
  },
  {
    id: "operations-log",
    title: "Bitácora",
    description: "Varios registros",
  },
  {
    id: "fuel-management",
    title: "Combustible",
    description: "Varios registros",
  },
];