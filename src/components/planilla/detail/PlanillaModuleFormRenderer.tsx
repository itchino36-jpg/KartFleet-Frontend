import HoursTracking from "@/modules/planilla/forms/TimeTracking";
import TripTracking from "@/modules/planilla/forms/TripTracking";
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

    case "trip-tracking":
      return (
        <TripTracking
          onSaved={onSaved}
        />
      );

    case "operating-income":
      return <OperationalIncome />;

    case "operating-expenses":
      return <OperatingExpenses />;

    case "operations-log":
      return <OperationLog />;

    case "fuel-management":
      return <FuelManagement />;

    default:
      return null;
  }
}