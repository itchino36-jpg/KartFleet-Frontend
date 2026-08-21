"use client";
import { useCallback, useEffect, useState } from "react";
import { getContractCatalogs, type ContractCatalogs } from "@/api/client/contract.api";
import { createContrato, getContratos } from "@/modules/contratos/services/contrato.service";
import type { Contrato, ContratoFormData } from "@/modules/contratos/types/contrato.types";
export function useContratos() {
  const [contratos, setContratos] = useState<Contrato[]>([]); const [catalogs, setCatalogs] = useState<ContractCatalogs>({ types: [], statuses: [] }); const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { const values = await getContractCatalogs(); setCatalogs(values); setContratos(await getContratos(values)); }, []);
  useEffect(() => { let active = true; queueMicrotask(() => load().catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : "No se pudieron cargar los contratos."); }).finally(() => { if (active) setIsLoading(false); })); return () => { active = false; }; }, [load]);
  return { contratos, catalogs, isLoading, error, async addContrato(data: ContratoFormData) { const created = await createContrato(data, catalogs); setContratos((current) => [...current, created]); return created; } };
}
