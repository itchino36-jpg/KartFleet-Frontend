import { createInsurance, getInsurances, updateInsurance, type BackendInsurance, type InsuranceCatalogItem, type InsurancePayload } from "@/api/client/insurance.api";
import type { Seguro, SeguroFormData } from "@/modules/seguros/types/seguro.types";

const PAYMENT_STORAGE_KEY = "insurance-payment-details";
type PaymentDetails = Pick<Seguro, "modalidadPago" | "cuotas" | "observaciones">;
function paymentDetails(): Record<string, PaymentDetails> { try { return JSON.parse(localStorage.getItem(PAYMENT_STORAGE_KEY) ?? "{}") as Record<string, PaymentDetails>; } catch { return {}; } }
function savePaymentDetails(id: string, data: SeguroFormData) { localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify({ ...paymentDetails(), [id]: { modalidadPago: data.modalidadPago, cuotas: data.cuotas, observaciones: data.observaciones } })); }
function dateOnly(value: string) { return value.slice(0, 10); }
function toPayload(data: SeguroFormData): InsurancePayload { return { vehicleId: data.vehiculoId, catalogInsurerId: data.catalogInsurerId, policyNumber: data.numeroPoliza?.trim().toUpperCase() ?? "", insuredValue: Number(data.valorAsegurado), deductible: Number(data.franquicia), startDate: data.fechaInicio, expirationDate: data.fechaFin, catalogInsuranceStatusId: data.catalogInsuranceStatusId }; }
function normalize(item: BackendInsurance, insurers: InsuranceCatalogItem[]): Seguro { const payment = paymentDetails()[item.insuranceId]; return { id: item.insuranceId, vehiculoId: item.vehicleId, catalogInsurerId: item.catalogInsurerId, catalogInsuranceStatusId: item.catalogInsuranceStatusId, aseguradora: item.catalogInsurer?.name ?? item.catalogInsurer?.description ?? insurers.find((value) => value.id === item.catalogInsurerId)?.name ?? "Aseguradora no disponible", numeroPoliza: item.policyNumber, valorAsegurado: String(item.insuredValue), franquicia: String(item.deductible), fechaInicio: dateOnly(item.startDate), fechaFin: dateOnly(item.expirationDate), observaciones: payment?.observaciones ?? "", modalidadPago: payment?.modalidadPago ?? "contado", cuotas: payment?.cuotas ?? [] }; }

export async function getSeguros(insurers: InsuranceCatalogItem[]) { return (await getInsurances()).map((item) => normalize(item, insurers)); }
export async function createSeguro(data: SeguroFormData, insurers: InsuranceCatalogItem[]) { const created = await createInsurance(toPayload(data)); savePaymentDetails(created.insuranceId, data); return normalize(created, insurers); }
export async function updateSeguro(id: string, data: SeguroFormData, insurers: InsuranceCatalogItem[]) { const updated = await updateInsurance(id, toPayload(data)); savePaymentDetails(id, data); return normalize({ ...updated, insuranceId: updated.insuranceId ?? id }, insurers); }
