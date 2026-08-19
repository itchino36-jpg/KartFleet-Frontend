"use client";

import { useEffect, useState } from "react";
import type { Seguro, SeguroFormData } from "@/modules/seguros/types/seguro.types";
import { createSeguro, deleteSeguro, getSeguros, updateSeguro } from "@/modules/seguros/services/seguro.service";

export function useSeguros() {
  const [seguros, setSeguros] = useState<Seguro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // El almacenamiento local solo está disponible después de montar el cliente.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try { setSeguros(getSeguros()); } catch (cause) { setError(cause instanceof Error ? cause.message : "No se pudieron cargar los seguros."); }
    finally { setIsLoading(false); }
  }, []);

  return {
    seguros,
    isLoading,
    error,
    addSeguro(data: SeguroFormData) {
      const created = createSeguro(data);
      setSeguros((current) => [...current, created]);
      return created;
    },
    editSeguro(id: string, data: SeguroFormData) {
      const updated = updateSeguro(id, data);
      if (updated) setSeguros((current) => current.map((item) => item.id === id ? updated : item));
      return updated;
    },
    removeSeguro(id: string) {
      const deleted = deleteSeguro(id);
      if (deleted) setSeguros((current) => current.filter((item) => item.id !== id));
      return deleted;
    },
  };
}
