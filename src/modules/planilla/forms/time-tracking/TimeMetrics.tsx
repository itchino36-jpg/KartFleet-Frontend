type TimeMetricsProps = {
  hoursWorked: string;
  effectiveHours: string;
};

export default function TimeMetrics({
  hoursWorked,
  effectiveHours,
}: TimeMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <div className="rounded-2xl bg-slate-900 p-4 sm:p-5">
        <p className="text-xs font-medium text-slate-300 sm:text-sm">
          Horas trabajadas
        </p>

        <p className="mt-1.5 text-2xl font-semibold text-white sm:mt-2 sm:text-3xl">
          {hoursWorked}

          <span className="ml-1 text-sm font-normal text-slate-400">
            h
          </span>
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <p className="text-xs font-medium text-slate-500 sm:text-sm">
          Horas efectivas
        </p>

        <p className="mt-1.5 text-2xl font-semibold text-slate-900 sm:mt-2 sm:text-3xl">
          {effectiveHours}

          <span className="ml-1 text-sm font-normal text-slate-400">
            h
          </span>
        </p>
      </div>
    </div>
  );
}
