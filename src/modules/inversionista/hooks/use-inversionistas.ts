"use client";

import { useEffect, useState } from "react";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

const STORAGE_KEY = "inversionistas";

export function useInversionistas() {
  const [inversionistas, setInversionistas] = useState<Inversionista[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setInversionistas(JSON.parse(saved));
      } catch {
        setInversionistas([]);
      }
    }

    setIsLoading(false);
  }, []);

  const saveInversionistas = (updated: Inversionista[]) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setInversionistas(updated);
  };

  const addInversionista = (
    datos: Omit<Inversionista, "id">
  ) => {
    const nuevoInversionista: Inversionista = {
      id: crypto.randomUUID(),
      ...datos,
      createdAt: datos.createdAt ?? new Date().toISOString(),
    };

    saveInversionistas([
      ...inversionistas,
      nuevoInversionista,
    ]);

    return nuevoInversionista;
  };

  const updateInversionista = (
    inversionistaActualizado: Inversionista
  ) => {
    const updated = inversionistas.map(
      (inversionista) =>
        inversionista.id === inversionistaActualizado.id
          ? inversionistaActualizado
          : inversionista
    );

    saveInversionistas(updated);
  };

  const deleteInversionista = (id: string) => {
    const updated = inversionistas.filter(
      (inversionista) => inversionista.id !== id
    );

    saveInversionistas(updated);
  };

  const getInversionistaById = (id: string) => {
    return inversionistas.find(
      (inversionista) => inversionista.id === id
    );
  };

  return {
    inversionistas,
    isLoading,
    addInversionista,
    updateInversionista,
    deleteInversionista,
    getInversionistaById,
  };
}
