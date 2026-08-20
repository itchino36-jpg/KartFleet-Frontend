"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CarFront } from "lucide-react";

import PageTitle from "@/components/layout/PageTitle";
import { useInversionistas } from "@/modules/inversionista/hooks/use-inversionistas";
import { useVehiculos } from "@/modules/vehiculo/hooks/use-vehiculos";

export default function InversionistaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { inversionistas, isLoading } = useInversionistas();
  const { vehiculos } = useVehiculos();
  const inversionista =
    inversionistas.find((item) => item.id === id) ?? null;
  const vehiculosAsociados = vehiculos.filter(
    (vehiculo) => vehiculo.inversionistaId === id
  );
  const fechaCreacion = inversionista?.createdAt
    ? new Intl.DateTimeFormat("es-BO", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(inversionista.createdAt))
    : "No disponible para registros anteriores";

  if (isLoading) {
    return <p className="text-sm text-slate-500">Cargando inversionista...</p>;
  }

  if (!inversionista) {
    return <p className="text-sm text-slate-500">Inversionista no encontrado.</p>;
  }

  const datos = [
    ["Documento o NIT", inversionista.documento],
    ["Teléfono", inversionista.telefono],
    ["Correo electrónico", inversionista.correo],
    ["Dirección", inversionista.direccion],
    ["Fecha de creación", fechaCreacion],
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <Link href="/dashboard/Inversionista" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <PageTitle title={inversionista.nombre} description="Información del inversionista" />
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {datos.map(([etiqueta, valor]) => (
            <div key={etiqueta}>
              <p className="text-xs font-medium text-slate-400">{etiqueta}</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{valor}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Vehículos asociados</h2>
            <p className="mt-1 text-sm text-slate-500">Vehículos registrados para este inversionista.</p>
          </div>
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{vehiculosAsociados.length}</span>
        </div>

        <div className="mt-5 h-[220px] overflow-y-auto overscroll-contain pr-1">
          {vehiculosAsociados.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center">
              <CarFront className="mx-auto h-6 w-6 text-slate-400" />
              <p className="mt-2 text-sm text-slate-500">No tiene vehículos asociados.</p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {vehiculosAsociados.map((vehiculo) => (
                <article key={vehiculo.id} className="min-h-[96px] rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <CarFront className="h-5 w-5 text-slate-700" />
                    <p className="font-semibold text-slate-950">{vehiculo.placa}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{vehiculo.marca} {vehiculo.modelo}</p>
                  <p className="mt-1 text-xs text-slate-500">{vehiculo.tipo}</p>
                </article>
              ))}
            </div>
          )}
        </div>
        </div>
      </section>
    </div>
  );
}
