import ActivityLogHistory from "@/components/planilla/history/ActivityLogHistory";
import ExpenseHistory from "@/components/planilla/history/ExpensesHistory";
import FuelHistory from "@/components/planilla/history/FuelHistory";
import HoursHistory from "@/components/planilla/history/HoursHistory";
import IncomeHistory from "@/components/planilla/history/IncomeHistory";
import PlanillaTripCounter from "@/components/planilla/detail/PlanillaTripCounter";

import type { FuelHistoryEntry } from "@/modules/planilla/forms/FuelManagement";
import type { HoursHistoryEntry } from "@/modules/planilla/forms/TimeTracking";
import type { IncomeHistoryEntry } from "@/modules/planilla/forms/OperationalIncome";
import type { ExpenseHistoryEntry } from "@/modules/planilla/forms/OperationalExpenses";
import type { ActivityLogEntry } from "@/modules/planilla/forms/OperationsLog";

type Props = {
  selectedSection: string;
  hoursEntries: HoursHistoryEntry[];
  incomeEntries: IncomeHistoryEntry[];
  expenseEntries: ExpenseHistoryEntry[];
  activityLogEntries: ActivityLogEntry[];
  fuelEntries: FuelHistoryEntry[];
};

export default function PlanillaDetailContent({
  selectedSection,
  hoursEntries,
  incomeEntries,
  expenseEntries,
  activityLogEntries,
  fuelEntries,
}: Props) {
  switch (selectedSection) {
    case "hours-tracking":
      return (
        <HoursHistory
          entries={hoursEntries}
        />
      );

    case "trip-tracking":
      return (
        <PlanillaTripCounter
          entries={incomeEntries}
        />
      );

    case "operating-income":
      return (
        <IncomeHistory
          entries={incomeEntries}
        />
      );

    case "operating-expenses":
      return (
        <ExpenseHistory
          entries={expenseEntries}
        />
      );

    case "operations-log":
      return (
        <ActivityLogHistory
          entries={activityLogEntries}
        />
      );

    case "fuel-management":
      return (
        <FuelHistory
          entries={fuelEntries}
        />
      );

    default:
      return null;
  }
}