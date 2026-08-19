
type Props = {
  selectedSection: string;
  onAdd?: () => void;
  readOnly?: boolean;
};

export default function PlanillaModuleContent({
  selectedSection,
  onAdd,
  readOnly = false,
}: Props) {
  const isTripTracking = selectedSection === "trip-tracking";

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
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

        {readOnly && !isTripTracking && <span className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">Solo lectura</span>}
        {onAdd && !isTripTracking && !readOnly && (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md sm:w-auto"
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
