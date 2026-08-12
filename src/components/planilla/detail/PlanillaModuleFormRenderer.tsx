
import HoursTracking from "@/modules/planilla/forms/TimeTracking";
import OperatingExpenses from "@/modules/planilla/forms/OperationalExpenses";
import OperationalIncome from "@/modules/planilla/forms/OperationalIncome";
import OperationLog from "@/modules/planilla/forms/OperationsLog";
import FuelManagement from "@/modules/planilla/forms/FuelManagement";

type Props = {
  moduleId: string;
  onSaved?: (entry: any) => void;
};

export default function PlanillaModuleFormRenderer({
  moduleId,
  onSaved,
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
        />
      );

    default:
      return null;
  }
}
