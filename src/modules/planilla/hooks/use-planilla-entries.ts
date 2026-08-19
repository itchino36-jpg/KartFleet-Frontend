"use client";

import { useEffect, useState } from "react";
import {
  getPlanillaEntries,
  savePlanillaEntries,
  type PlanillaEntries,
} from "@/modules/planilla/services/planilla-entries.service";

import type { HoursHistoryEntry } from "@/modules/planilla/forms/TimeTracking";
import type { IncomeHistoryEntry } from "@/modules/planilla/forms/OperationalIncome";
import type { ExpenseHistoryEntry } from "@/modules/planilla/forms/OperationalExpenses";
import type { ActivityLogEntry } from "@/modules/planilla/forms/OperationsLog";
import type { FuelHistoryEntry } from "@/modules/planilla/forms/FuelManagement";

const emptyEntries: PlanillaEntries = {
  hoursEntries: [],
  incomeEntries: [],
  expenseEntries: [],
  activityLogEntries: [],
  fuelEntries: [],
};

export function usePlanillaEntries(planillaId: string, readOnly = false) {
  const [entries, setEntries] = useState<PlanillaEntries>(emptyEntries);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setEntries(getPlanillaEntries(planillaId));
      setIsLoading(false);
    });
    return () => { active = false; };
  }, [planillaId]);

  const persist = (updated: PlanillaEntries) => {
    setEntries(updated);
    savePlanillaEntries(planillaId, updated);
  };

  const addHoursEntry = (entry: HoursHistoryEntry) => {
    if (readOnly) return;
    persist({
      ...entries,
      hoursEntries: [...entries.hoursEntries, entry],
    });
  };

  const addIncomeEntry = (entry: IncomeHistoryEntry) => {
    if (readOnly) return;
    persist({
      ...entries,
      incomeEntries: [...entries.incomeEntries, entry],
    });
  };

  const addExpenseEntry = (entry: ExpenseHistoryEntry) => {
    if (readOnly) return;
    persist({
      ...entries,
      expenseEntries: [...entries.expenseEntries, entry],
    });
  };

  const addActivityLogEntry = (entry: ActivityLogEntry) => {
    if (readOnly) return;
    persist({
      ...entries,
      activityLogEntries: [...entries.activityLogEntries, entry],
    });
  };

  const addFuelEntry = (entry: FuelHistoryEntry) => {
    if (readOnly) return;
    persist({
      ...entries,
      fuelEntries: [...entries.fuelEntries, entry],
    });
  };

  return {
    entries,
    isLoading,
    addHoursEntry,
    addIncomeEntry,
    addExpenseEntry,
    addActivityLogEntry,
    addFuelEntry,
  };
}
