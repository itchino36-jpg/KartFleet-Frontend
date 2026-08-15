import { Wallet } from "lucide-react";

interface Expense {
  concepto: string;
  monto: number;
  detalle: string;
}

interface PlanillaExpenseSummaryProps {
  expenses: Expense[];
  money: Intl.NumberFormat;
}

export default function PlanillaExpenseSummary({
  expenses,
  money,
}: PlanillaExpenseSummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex items-center gap-2">
        <Wallet className="h-4 w-4 text-slate-950" />

        <h2 className="text-lg font-semibold text-slate-950">
          Gastos registrados
        </h2>
      </div>

      <div className="mt-4 space-y-3">

        {expenses.map((gasto) => (
          <div
            key={gasto.concepto}
            className="rounded-xl bg-slate-50 px-3 py-3"
          >

            <div className="flex items-center justify-between gap-3">

              <p className="font-semibold text-slate-950">
                {gasto.concepto}
              </p>

              <span className="text-sm font-semibold text-slate-950">
                {money.format(gasto.monto)}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-600">
              {gasto.detalle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}