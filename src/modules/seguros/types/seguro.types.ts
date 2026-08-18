export interface Seguro {
  id: string;
  vehiculoId: string;
  aseguradora: string;
  numeroPoliza: string;
  tipoCobertura: string;
  fechaInicio: string;
  fechaVencimiento: string;
  montoAsegurado: string;
  costoPrima: string;
  observaciones: string;
}

export type SeguroFormData = Omit<Seguro, "id">;
export type SeguroStatus = "vigente" | "por_vencer" | "vencido";
