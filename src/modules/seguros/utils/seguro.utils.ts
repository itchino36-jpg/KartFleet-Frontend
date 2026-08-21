import type { SeguroStatus } from "@/modules/seguros/types/seguro.types";

export const SEGURO_CREDIT_BASE_RATE = 0.04;
export const SEGURO_CREDIT_ADDITIONAL_RATE = 0.1;
export const SEGURO_CREDIT_FINANCED_RATE = 0.7;
export const SEGURO_CREDIT_INSTALLMENT_COUNT = 5;
export const SEGURO_CREDIT_INSTALLMENT_MULTIPLE = 5;
export const SEGURO_MINIMUM_TOTAL = 4_900;

export interface SeguroCreditCalculation {
  valorAsegurado: number;
  prima: number;
  adicional: number;
  totalCalculado: number;
  totalPagar: number;
  montoFinanciado: number;
  cuotaSinAjustar: number;
  montoCuota: number;
  cantidadCuotas: number;
  totalCuotas: number;
  pagoInicial: number;
}

export function calculateSeguroCredit(valorAsegurado: string | number): SeguroCreditCalculation | null {
  const insuredValue = Number(valorAsegurado);
  if (!Number.isFinite(insuredValue) || insuredValue <= 0) return null;

  // Todas las operaciones monetarias finales se realizan en centavos.
  const valorAseguradoCentavos = Math.round(insuredValue * 100);
  const primaCentavos = Math.round(valorAseguradoCentavos * SEGURO_CREDIT_BASE_RATE);
  const adicionalCentavos = Math.round(primaCentavos * SEGURO_CREDIT_ADDITIONAL_RATE);
  const totalCalculadoCentavos = primaCentavos + adicionalCentavos;
  const totalMinimoCentavos = SEGURO_MINIMUM_TOTAL * 100;
  const totalPagarCentavos = Math.max(totalCalculadoCentavos, totalMinimoCentavos);
  const montoFinanciadoCentavos = Math.round(totalPagarCentavos * SEGURO_CREDIT_FINANCED_RATE);
  const cuotaSinAjustarCentavos = montoFinanciadoCentavos / SEGURO_CREDIT_INSTALLMENT_COUNT;
  const multiploCentavos = SEGURO_CREDIT_INSTALLMENT_MULTIPLE * 100;
  const montoCuotaCentavos = Math.floor(cuotaSinAjustarCentavos / multiploCentavos) * multiploCentavos;
  const totalCuotasCentavos = montoCuotaCentavos * SEGURO_CREDIT_INSTALLMENT_COUNT;
  const pagoInicialCentavos = totalPagarCentavos - totalCuotasCentavos;

  const toMoney = (centavos: number) => centavos / 100;

  return {
    valorAsegurado: toMoney(valorAseguradoCentavos),
    prima: toMoney(primaCentavos),
    adicional: toMoney(adicionalCentavos),
    totalCalculado: toMoney(totalCalculadoCentavos),
    totalPagar: toMoney(totalPagarCentavos),
    montoFinanciado: toMoney(montoFinanciadoCentavos),
    cuotaSinAjustar: toMoney(cuotaSinAjustarCentavos),
    montoCuota: toMoney(montoCuotaCentavos),
    cantidadCuotas: SEGURO_CREDIT_INSTALLMENT_COUNT,
    totalCuotas: toMoney(totalCuotasCentavos),
    pagoInicial: toMoney(pagoInicialCentavos),
  };
}

export function getSeguroStatus(fechaVencimiento: string): SeguroStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiration = new Date(`${fechaVencimiento}T00:00:00`);
  const daysRemaining = Math.ceil((expiration.getTime() - today.getTime()) / 86_400_000);
  if (daysRemaining < 0) return "vencido";
  if (daysRemaining <= 30) return "por_vencer";
  return "vigente";
}

export const SEGURO_STATUS_LABELS: Record<SeguroStatus, string> = {
  vigente: "Activo",
  por_vencer: "Por vencerse",
  vencido: "Expirado",
};

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-BO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function formatMoney(value: string) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return value;
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
