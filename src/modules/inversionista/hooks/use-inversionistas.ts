"use client";

import { useEffect, useState } from "react";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import {
  getInversionistas as fetchInversionistas,
  updateInversionista as persistInversionista,
} from "@/api/client/investor.api";

export function useInversionistas() {
  const [inversionistas, setInversionistas] = useState<Inversionista[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    localStorage.removeItem("inversionistas");
    fetchInversionistas()
      .then((items) => {
        if (!active) return;
        setInversionistas(items.map((item) => ({
          id: item.investorId,
          nombre: item.fullName,
          documento: item.nationalId,
          telefono: item.phone,
          correo: item.email,
          direccion: item.address,
          createdAt: item.createdAt,
        })));
      })
      .catch((cause) => {
        if (active) setError(cause instanceof Error ? cause.message : "No se pudieron cargar los inversionistas.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => { active = false; };
  }, []);

  const addInversionista = (datos: Omit<Inversionista, "id">, id?: string) => {
    const nuevoInversionista: Inversionista = {
      id: id ?? crypto.randomUUID(),
      ...datos,
      createdAt: datos.createdAt ?? new Date().toISOString(),
    };
    setInversionistas((current) => [...current, nuevoInversionista]);
    return nuevoInversionista;
  };

  const updateInversionista = async (updated: Inversionista) => {
    await persistInversionista(updated.id, updated);
    setInversionistas((current) => current.map((item) => item.id === updated.id ? updated : item));
  };

  const deleteInversionista = (id: string) => {
    setInversionistas((current) => current.filter((item) => item.id !== id));
  };

  const getInversionistaById = (id: string) => inversionistas.find((item) => item.id === id);

  return {
    inversionistas,
    isLoading,
    error,
    addInversionista,
    updateInversionista,
    deleteInversionista,
    getInversionistaById,
  };
}
