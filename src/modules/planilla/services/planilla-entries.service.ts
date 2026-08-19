import type { HoursHistoryEntry } from "@/modules/planilla/forms/TimeTracking";
import type { IncomeHistoryEntry } from "@/modules/planilla/forms/OperationalIncome";
import type { ExpenseHistoryEntry } from "@/modules/planilla/forms/OperationalExpenses";
import type { ActivityLogEntry } from "@/modules/planilla/forms/OperationsLog";
import type { FuelHistoryEntry } from "@/modules/planilla/forms/FuelManagement";

export interface PlanillaEntries {
  hoursEntries: HoursHistoryEntry[];
  incomeEntries: IncomeHistoryEntry[];
  expenseEntries: ExpenseHistoryEntry[];
  activityLogEntries: ActivityLogEntry[];
  fuelEntries: FuelHistoryEntry[];
}

const emptyEntries: PlanillaEntries = {
  hoursEntries: [],
  incomeEntries: [],
  expenseEntries: [],
  activityLogEntries: [],
  fuelEntries: [],
};

const getStorageKey = (planillaId: string) =>
  `planilla-entries:${planillaId}`;

export function getPlanillaEntries(
  planillaId: string
): PlanillaEntries {
  if (typeof window === "undefined") {
    return emptyEntries;
  }

  const saved = localStorage.getItem(
    getStorageKey(planillaId)
  );

  if (!saved) {
    return emptyEntries;
  }

  try {
    return JSON.parse(saved) as PlanillaEntries;
  } catch {
    return emptyEntries;
  }
}

export function savePlanillaEntries(
  planillaId: string,
  entries: PlanillaEntries
): void {
  localStorage.setItem(
    getStorageKey(planillaId),
    JSON.stringify(entries)
  );
}

export function getPlanillaEntryTotals(planillaId: string) {
  const entries = getPlanillaEntries(planillaId);
  return {
    hasIncomeEntries: entries.incomeEntries.length > 0,
    hasExpenseEntries: entries.expenseEntries.length > 0,
    ingresos: entries.incomeEntries.reduce((total, entry) => total + (Number(entry.amount) || 0), 0),
    egresos: entries.expenseEntries.reduce((total, entry) => total + (Number(entry.amount) || 0), 0),
    totalCarreras: entries.incomeEntries.length,
  };
}
