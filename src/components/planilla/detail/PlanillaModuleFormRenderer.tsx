
import HoursTracking from "@/modules/planilla/forms/TimeTracking";
import OperatingExpenses from "@/modules/planilla/forms/OperationalExpenses";
import OperationalIncome from "@/modules/planilla/forms/OperationalIncome";
import OperationLog from "@/modules/planilla/forms/OperationsLog";
import FuelManagement from "@/modules/planilla/forms/FuelManagement";
import type { FuelHistoryEntry } from "@/modules/planilla/forms/FuelManagement";
import type { HoursHistoryEntry } from "@/modules/planilla/forms/TimeTracking";
import type { IncomeHistoryEntry } from "@/modules/planilla/forms/OperationalIncome";
import type { ExpenseHistoryEntry } from "@/modules/planilla/forms/OperationalExpenses";
import type { ActivityLogEntry } from "@/modules/planilla/forms/OperationsLog";

type ModuleEntry = FuelHistoryEntry | HoursHistoryEntry | IncomeHistoryEntry | ExpenseHistoryEntry | ActivityLogEntry;

type Props = {
  moduleId: string;
  onSaved?: (entry: ModuleEntry) => void;
  vehicleType?: string;
};

export default function PlanillaModuleFormRenderer({
  moduleId,
  onSaved,
  vehicleType,
}: Props) {
  switch (moduleId) {
    case "hours-tracking":
      return (
        <HoursTracking
          onSaved={onSaved}
        />
      );

    case "operating-income":
      return (
        <OperationalIncome
          onSaved={onSaved}
        />
      );

    case "operating-expenses":
      return (
        <OperatingExpenses
          onSaved={onSaved}
        />
      );

    case "operations-log":
      return (
        <OperationLog
          onSaved={onSaved}
        />
      );

    case "fuel-management":
      return (
        <FuelManagement
          onSaved={onSaved}
          vehicleType={vehicleType}
        />
      );

    default:
      return null;
  }
}
