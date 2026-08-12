import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import type { IncomeHistoryEntry } from "@/modules/planilla/forms/OperationalIncome";

interface IncomeHistoryProps {
  entries: IncomeHistoryEntry[];
}

const tripSourceLabels: Record<
  IncomeHistoryEntry["tripSource"],
  string
> = {
  yango: "Yango",
  indrive: "InDrive",
  externo: "Externo",
};

export default function IncomeHistory({
  entries,
}: IncomeHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold text-slate-900">
          No hay ingresos registrados.
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Los registros que agregues aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-slate-600">
              Fecha
            </TableHead>

            <TableHead className="text-slate-600">
              Empresa
            </TableHead>

            <TableHead className="text-slate-600">
              Origen
            </TableHead>

            <TableHead className="text-slate-600">
              Tipo de pago
            </TableHead>

            <TableHead className="text-slate-600">
              Monto
            </TableHead>

            <TableHead className="text-slate-600">
              Observaciones
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {entries.map((entry) => (
            <TableRow
              key={entry.id}
              className="align-top"
            >
              <TableCell className="text-slate-700">
                {entry.createdAt}
              </TableCell>

              <TableCell className="font-semibold text-slate-950">
                {entry.company}
              </TableCell>

              <TableCell className="font-medium text-slate-700">
                {tripSourceLabels[entry.tripSource]}
              </TableCell>

              <TableCell className="text-slate-700">
                {entry.paymentType}
              </TableCell>

              <TableCell className="font-semibold tabular-nums text-slate-950">
                Bs {entry.amount}
              </TableCell>

              <TableCell className="text-slate-700">
                {entry.observations || "Sin observaciones"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}