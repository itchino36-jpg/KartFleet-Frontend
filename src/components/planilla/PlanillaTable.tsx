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
import { money } from "@/modules/planilla/constants/format.constants";

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

export default function PlanillaTable({ planillas }: PlanillaTableProps) {
  return (
    <div className="max-h-[430px] overflow-auto overscroll-contain rounded-2xl border border-slate-200 bg-white shadow-inner shadow-slate-100 [scrollbar-color:#94a3b8_transparent] [scrollbar-width:thin]">
      <Table className="min-w-[980px]">
        <TableHeader className="sticky top-0 z-10 bg-slate-50/95 shadow-[0_1px_0_#e2e8f0] backdrop-blur">
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
            <TableRow key={planilla.id} className="group align-top transition duration-200 hover:bg-slate-50">
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
                  className="inline-flex items-center rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
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
