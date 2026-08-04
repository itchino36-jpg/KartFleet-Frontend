import FuelManagement from "@/modules/planilla/forms/FuelManagement";
import OperatingExpenses from "@/modules/planilla/forms/OperationalExpenses";
import OperationalIncome from "@/modules/planilla/forms/OperationalIncome";
import OperationLog from "@/modules/planilla/forms/OperationsLog";
import HoursTracking from "@/modules/planilla/forms/TimeTracking";
import TripTracking from "@/modules/planilla/forms/TripTracking";

type Props = {
  selectedSection: string;
  showForm: boolean;
  onAdd?: () => void;
};

function renderSectionContent(
  id: string,
  showForm: boolean,
  onAdd?: () => void
) {
  switch (id) {
    case "hours-tracking":
      return (
        <HoursTracking/>
      );

    case "trip-tracking":
      return (
        <TripTracking
          showForm={showForm}
          onAdd={onAdd}
        />
      );

    case "operating-income":
      return (
        <OperationalIncome
          showForm={showForm}
          onAdd={onAdd}
        />
      );

    case "operating-expenses":
      return (
        <OperatingExpenses
          showForm={showForm}
          onAdd={onAdd}
        />
      );

    case "operations-log":
      return (
        <OperationLog/>
      );

    case "fuel-management":
      return (
        <FuelManagement
          showForm={showForm}
          onAdd={onAdd}
        />
      );

    default:
      return null;
  }
}

export default function PlanillaModuleContent({
  selectedSection,
  showForm,
  onAdd,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      {renderSectionContent(
        selectedSection,
        showForm,
        onAdd
      )}
    </div>
  );
}