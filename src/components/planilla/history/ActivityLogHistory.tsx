
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import type { ActivityLogEntry } from "@/modules/planilla/forms/OperationsLog";

interface ActivityLogHistoryProps {
  entries: ActivityLogEntry[];
}

export default function ActivityLogHistory({
  entries,
}: ActivityLogHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-6 sm:px-5">
          <h2 className="text-base font-semibold text-slate-900">
            No hay actividades registradas.
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Las actividades que agregues aparecerán aquí.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table className="min-w-[760px]">
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="text-slate-600">
                Fecha
              </TableHead>

              <TableHead className="text-slate-600">
                Hora actividad
              </TableHead>

              <TableHead className="text-slate-600">
                Descripción actividad
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
                  {entry.activityTime}
                </TableCell>

                <TableCell className="text-slate-700">
                  {entry.activityDescription}
                </TableCell>

                <TableCell className="text-slate-700">
                  {entry.observations || "Sin observaciones"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
