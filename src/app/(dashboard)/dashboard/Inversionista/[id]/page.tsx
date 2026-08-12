"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

export default function InversionistaDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [inversionista, setInversionista] =
    useState<Inversionista | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("inversionistas");

    if (!saved) {
      return;
    }

    const inversionistas: Inversionista[] = JSON.parse(saved);

    const found = inversionistas.find(
      (item) => item.id === id
    );

    setInversionista(found ?? null);
  }, [id]);

  if (!inversionista) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-sm text-slate-500">
          Inversionista no encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
        <Link
            href="/dashboard/Inversionista"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
            <ArrowLeft className="h-4 w-4" />
        Volver a inversionistas
        </Link>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">
          {inversionista.nombre}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Información del inversionista
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-slate-400">
              Documento o NIT
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {inversionista.documento}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Teléfono
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {inversionista.telefono}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Correo electrónico
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {inversionista.correo}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Dirección
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {inversionista.direccion}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 