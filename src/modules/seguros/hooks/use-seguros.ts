"use client";
import { useCallback, useEffect, useState } from "react";
import { getInsuranceCatalogs, type InsuranceCatalogItem } from "@/api/client/insurance.api";
import type { Seguro, SeguroFormData } from "@/modules/seguros/types/seguro.types";
import { createSeguro, getSeguros, updateSeguro } from "@/modules/seguros/services/seguro.service";

export function useSeguros() {
  const [seguros, setSeguros] = useState<Seguro[]>([]); const [insurers, setInsurers] = useState<InsuranceCatalogItem[]>([]); const [statuses, setStatuses] = useState<InsuranceCatalogItem[]>([]); const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { const catalogs = await getInsuranceCatalogs(); setInsurers(catalogs.insurers); setStatuses(catalogs.statuses); setSeguros(await getSeguros(catalogs.insurers)); }, []);
  useEffect(() => { let active = true; queueMicrotask(() => load().catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : "No se pudieron cargar los seguros."); }).finally(() => { if (active) setIsLoading(false); })); return () => { active = false; }; }, [load]);
  return { seguros, insurers, statuses, isLoading, error, async addSeguro(data: SeguroFormData) { const created = await createSeguro(data, insurers); setSeguros((current) => [...current, created]); return created; }, async editSeguro(id: string, data: SeguroFormData) { const updated = await updateSeguro(id, data, insurers); setSeguros((current) => current.map((item) => item.id === id ? updated : item)); return updated; } };
}
