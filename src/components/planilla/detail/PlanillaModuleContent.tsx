
type Props = {
  selectedSection: string;
  onAdd?: () => void;
};

export default function PlanillaModuleContent({
  selectedSection,
  onAdd,
}: Props) {
  const isTripTracking = selectedSection === "trip-tracking";

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Módulo de planilla
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            {getModuleTitle(selectedSection)}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isTripTracking
              ? "Consulta el total de carreras según su origen."
              : "Consulta la información registrada o agrega un nuevo registro."}
          </p>
        </div>

        {onAdd && !isTripTracking && (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            + Agregar
          </button>
        )}
      </div>
    </div>
  );
}

function getModuleTitle(id: string) {
  switch (id) {
    case "hours-tracking":
      return "Control de horas";

    case "trip-tracking":
      return "Control de carreras";

    case "operating-income":
      return "Ingresos operativos";

    case "operating-expenses":
      return "Egresos operativos";

    case "operations-log":
      return "Bitácora operativa";

    case "fuel-management":
      return "Control de combustible";

    default:
      return "Módulo";
  }
}