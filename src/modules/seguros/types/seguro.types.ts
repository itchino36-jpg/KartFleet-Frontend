export interface CuotaSeguro {
  id: string;
  mes: string;
  monto: string;
}

export type ModalidadPagoSeguro = "contado" | "credito";

export interface Seguro {
  id: string;
  vehiculoId: string;
  aseguradora: string;
  catalogInsurerId: string;
  catalogInsuranceStatusId: string;
  numeroPoliza?: string;
  valorAsegurado: string;
  franquicia: string;
  fechaInicio: string;
  fechaFin: string;
  observaciones?: string;
  modalidadPago: ModalidadPagoSeguro;
  cuotas: CuotaSeguro[];
}

export type SeguroFormData = Omit<Seguro, "id">;
export type SeguroStatus = "vigente" | "por_vencer" | "vencido";
