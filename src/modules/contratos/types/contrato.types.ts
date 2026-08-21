export interface ArchivoContrato { nombre: string; tipo: string; tamano: number }
export interface Contrato {
  id: string; inversionistaId: string; vehiculoId: string; numeroContrato: string;
  catalogContractTypeId: string; tipoContrato: string; fechaInicio: string; fechaFin: string;
  montoMensual: string; montoCompra: string; catalogContractStatusId: string; estado: string;
  observaciones?: string; archivo?: ArchivoContrato; createdAt: string;
}
export interface ContratoFormData {
  inversionistaId: string; vehiculoId: string; catalogContractTypeId: string;
  fechaInicio: string; fechaFin: string; montoMensual: string; montoCompra: string;
  catalogContractStatusId: string; observaciones?: string; archivo: File;
}
