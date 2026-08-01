import Link from "next/link";
import { ArrowLeft, CircleDollarSign, Fuel, Route, Wallet } from "lucide-react";
import { notFound } from "next/navigation";

const planillaDetalle = [
  {
    id: "PL-001",
    folio: "Folio PL-001",
    fecha: "01 Ago 2026",
    conductor: "Mario Chino",
    movil: "MC-12",
    estado: "En proceso",
    horasTrabajadas: "8.5 h",
    horasNoTrabajadas: "1.5 h",
    totalCarreras: 18,
    ingresos: 2450,
    egresos: 520,
    combustible: 280,
    gasInicio: 45,
    gasFin: 22,
    ingresoPorCarrera: 136,
    gastos: [
      { concepto: "Pinchada de llanta", monto: 12000, detalle: "Cambio de llanta en carretera, servicio a la vuelta de la salida." },
      { concepto: "Gasolina", monto: 9800, detalle: "Carga en la estación de San Joaquín antes del trayecto principal." },
      { concepto: "Repuesto menor", monto: 3500, detalle: "Kit de sujeción y ajuste rápido en taller local." },
    ],
    bitacora: [
      "Comencé el recorrido con 45 litros de gasolina y salí con el móvil en condiciones normales.",
      "Tuve una detención por una pinchada en la llanta trasera derecha, se cambió la llanta y se continuó el viaje.",
      "El motivo del retraso fue una parada técnica en ruta para revisar la presión de neumáticos.",
      "Al cierre del turnos, dejé el vehículo con 22 litros de gasolina y el balance total fue positivo.",
    ],
  },
  {
    id: "PL-002",
    folio: "Folio PL-002",
    fecha: "31 Jul 2026",
    conductor: "Ana Torres",
    movil: "AT-07",
    estado: "Finalizada",
    horasTrabajadas: "9.0 h",
    horasNoTrabajadas: "1.0 h",
    totalCarreras: 20,
    ingresos: 2680,
    egresos: 610,
    combustible: 310,
    gasInicio: 40,
    gasFin: 18,
    ingresoPorCarrera: 134,
    gastos: [
      { concepto: "Gasolina", monto: 11000, detalle: "Recarga de 40 litros al inicio de la jornada." },
      { concepto: "Mantenimiento menor", monto: 4200, detalle: "Ajuste de freno y limpieza del vehículo." },
    ],
    bitacora: [
      "El día comenzó con revisión rápida del vehículo y salida puntual.",
      "Se registró una demora breve por tráfico pesado en el centro urbano.",
      "Se completó el recorrido con cierre de caja y entrega de resumen sin novedades." ,
    ],
  },
];

const money = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default async function PlanillaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const planilla = planillaDetalle.find((item) => item.id === id);

  if (!planilla) {
    notFound();
  }

  const balance = planilla.ingresos - planilla.egresos - planilla.combustible;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 bg-white px-2 py-2 md:px-4">
      <div className="rounded-3xl bg-[#151310] p-5 text-white shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-300">FlotaControl / Planillas / Resumen</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">Resumen de {planilla.folio}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Vista de solo lectura de la planilla. Aquí puedes revisar ingresos, gastos, combustible y bitácora sin editar nada.
            </p>
          </div>

          <Link
            href="/dashboard/planilla"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al historial
          </Link>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Conductor</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{planilla.conductor}</p>
          <p className="text-sm text-slate-600">Móvil {planilla.movil}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Fecha</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{planilla.fecha}</p>
          <p className="text-sm text-slate-600">Estado: {planilla.estado}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Carreras</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{planilla.totalCarreras}</p>
          <p className="text-sm text-slate-600">Ingreso por carrera: {money.format(planilla.ingresoPorCarrera)}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Balance</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{money.format(balance)}</p>
          <p className="text-sm text-slate-600">Ingresos netos del turno</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-slate-950" />
            <h2 className="text-lg font-semibold text-slate-950">Ingresos y egresos</h2>
          </div>

          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Ingresos</span>
              <span className="font-semibold text-slate-950">{money.format(planilla.ingresos)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Egresos</span>
              <span className="font-semibold text-slate-950">{money.format(planilla.egresos)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Combustible</span>
              <span className="font-semibold text-slate-950">{money.format(planilla.combustible)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-slate-950" />
            <h2 className="text-lg font-semibold text-slate-950">Combustible</h2>
          </div>

          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Gasolina al inicio</span>
              <span className="font-semibold text-slate-950">{planilla.gasInicio} L</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Gasolina al cierre</span>
              <span className="font-semibold text-slate-950">{planilla.gasFin} L</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Consumo estimado</span>
              <span className="font-semibold text-slate-950">{planilla.gasInicio - planilla.gasFin} L</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-slate-950" />
            <h2 className="text-lg font-semibold text-slate-950">Gastos registrados</h2>
          </div>

          <div className="mt-4 space-y-3">
            {planilla.gastos.map((gasto) => (
              <div key={gasto.concepto} className="rounded-xl bg-slate-50 px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-950">{gasto.concepto}</p>
                  <span className="text-sm font-semibold text-slate-950">{money.format(gasto.monto)}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{gasto.detalle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Route className="h-4 w-4 text-slate-950" />
            <h2 className="text-lg font-semibold text-slate-950">Bitácora del recorrido</h2>
          </div>

          <div className="mt-4 space-y-3">
            {planilla.bitacora.map((item, index) => (
              <div key={`${item}-${index}`} className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
