import type { SeguroStatus } from "@/modules/seguros/types/seguro.types";

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
    maximumFractionDigits: 2,
  }).format(amount);
}
