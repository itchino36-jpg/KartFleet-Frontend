import HoursTracking from "@/modules/planilla/forms/TimeTracking";
import TripTracking from "@/modules/planilla/forms/TripTracking";
import OperatingExpenses from "@/modules/planilla/forms/OperationalExpenses";
import OperationalIncome from "@/modules/planilla/forms/OperationalIncome";
import OperationLog from "@/modules/planilla/forms/OperationsLog";
import FuelManagement from "@/modules/planilla/forms/FuelManagement";

type Props = {
  moduleId: string;
};

export default function PlanillaModuleFormRenderer({
  moduleId,
}: Props) {
  switch (moduleId) {
    case "hours-tracking":
      return <HoursTracking />;

    case "trip-tracking":
      return <TripTracking />;

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