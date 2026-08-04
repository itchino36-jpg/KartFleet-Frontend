import Link from "next/link";
import PlanillaStatusBadge from "@/components/planilla/PlanillaStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

interface PlanillaTableProps {
  planillas: Array<{
    id: string;
    folio: string;
    fecha: string;
    conductor: string;
    movil: string;
    estado: "En proceso" | "Finalizada";
    horasTrabajadas: string;
    horasNoTrabajadas: string;
    totalCarreras: number;
    ingresos: number;
    egresos: number;
    combustible: number;
  }>;
  
}

const money = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default function PlanillaTable({ planillas }: PlanillaTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="text-slate-600">Folio</TableHead>
            <TableHead className="text-slate-600">Fecha</TableHead>
            <TableHead className="text-slate-600">Conductor</TableHead>
            <TableHead className="text-slate-600">Móvil</TableHead>
            <TableHead className="text-slate-600">Carreras</TableHead>
            <TableHead className="text-slate-600">Ingresos</TableHead>
            <TableHead className="text-slate-600">Egresos</TableHead>
            <TableHead className="text-slate-600">Estado</TableHead>
            <TableHead className="text-right text-slate-600">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {planillas.map((planilla) => (
            <TableRow key={planilla.id} className="align-top">
              <TableCell className="font-semibold text-slate-950">{planilla.folio}</TableCell>
              <TableCell className="text-slate-700">{planilla.fecha}</TableCell>
              <TableCell className="text-slate-700">{planilla.conductor}</TableCell>
              <TableCell className="text-slate-700">{planilla.movil}</TableCell>
              <TableCell className="tabular-nums text-slate-700">{planilla.totalCarreras}</TableCell>
              <TableCell className="tabular-nums text-slate-700">
                {money.format(planilla.ingresos)}
              </TableCell>
              <TableCell className="tabular-nums text-slate-700">
                {money.format(planilla.egresos)}
              </TableCell>
              <TableCell>
                <PlanillaStatusBadge estado={planilla.estado} />
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/dashboard/planilla/${planilla.id}`}
                  className="inline-flex items-center rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  {planilla.estado === "En proceso"
                    ? "Continuar"
                    : "Ver resumen"}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
