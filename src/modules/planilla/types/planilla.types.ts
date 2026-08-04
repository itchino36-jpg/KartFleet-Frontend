export interface PlanillaExpense {
  concepto: string;
  monto: number;
  detalle: string;
}

export type PlanillaStatus =
  | "En proceso"
  | "Finalizada";


export interface Planilla {
  id: string;
  folio: string;
  fecha: string;
  conductor: string;
  movil: string;
  estado: PlanillaStatus;

  horasTrabajadas: string;
  horasNoTrabajadas: string;

  totalCarreras: number;

  ingresos: number;
  egresos: number;
  combustible: number;

  gasInicio: number;
  gasFin: number;

  ingresoPorCarrera: number;

  gastos: PlanillaExpense[];

  bitacora: string[];
}


export type PlanillaModuleId =
  | "hours-tracking"
  | "trip-tracking"
  | "operating-income"
  | "operating-expenses"
  | "operations-log"
  | "fuel-management";



  
export interface PlanillaModuleItem {
  id: PlanillaModuleId;
  title: string;
  description: string;
}