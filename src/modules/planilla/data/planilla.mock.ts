import { Planilla } from "../types/planilla.types";

export const planillaDetalle: Planilla[] = [
  {
    id: "PL-001",
    folio: "Folio PL-001",
    fecha: "01 Ago 2026",
    arrivalOffice: "08:00",
    conductor: "Mario Chino",
    movil: "MC-12",
    tipoVehiculo: "Auto",
    estado: "Finalizada",
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
      {
        concepto: "Pinchada de llanta",
        monto: 12000,
        detalle:
          "Cambio de llanta en carretera, servicio a la vuelta de la salida.",
      },
      {
        concepto: "Gasolina",
        monto: 9800,
        detalle:
          "Carga en la estación de San Joaquín antes del trayecto principal.",
      },
      {
        concepto: "Repuesto menor",
        monto: 3500,
        detalle:
          "Kit de sujeción y ajuste rápido en taller local.",
      },
    ],

    bitacora: [
      "Comencé el recorrido con 45 litros de gasolina y salí con el móvil en condiciones normales.",
    ],
  },

  {
    id: "PL-002",
    folio: "Folio PL-002",
    fecha: "31 Jul 2026",
    arrivalOffice: "07:45",
    conductor: "Ana Torres",
    movil: "AT-07",
    tipoVehiculo: "Auto",
    estado: "En proceso",
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
      {
        concepto: "Gasolina",
        monto: 11000,
        detalle:
          "Recarga de 40 litros al inicio de la jornada.",
      },
      {
        concepto: "Mantenimiento menor",
        monto: 4200,
        detalle:
          "Ajuste de freno y limpieza del vehículo.",
      },
    ],

    bitacora: [
      "El día comenzó con revisión rápida del vehículo y salida puntual.",
      "Se registró una demora breve por tráfico pesado en el centro urbano.",
      "Se completó el recorrido con cierre de caja y entrega de resumen sin novedades.",
    ],
  },
];
