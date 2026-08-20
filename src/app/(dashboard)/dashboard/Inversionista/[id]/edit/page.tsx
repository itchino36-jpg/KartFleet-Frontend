"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import InversionistaForm from "@/components/inversionista/InversionistaForm";
import { useInversionistas } from "@/modules/inversionista/hooks/use-inversionistas";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { InversionistaFormData } from "@/modules/inversionista/types/inversionista.types";
import PageTitle from "@/components/layout/PageTitle";
import { EditInversionistaConfirmation } from "@/components/inversionista/EditInversionistaConfirmation";

export default function EditarInversionistaPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;
  const [actualizacionPendiente, setActualizacionPendiente] =
    useState<Inversionista | null>(null);

  const {
    inversionistas,
    updateInversionista,
  } = useInversionistas();

  const inversionista =
    inversionistas.find(
      (item) => item.id === id
    ) ?? null;

  const handleSave = (data: InversionistaFormData) => {
    if (!inversionista) {
      return;
    }

    const duplicate = inversionistas.some((item) =>
      item.id !== inversionista.id &&
      (
        item.documento.trim().toLowerCase() === data.documento.trim().toLowerCase() ||
        item.correo.trim().toLowerCase() === data.correo.trim().toLowerCase() ||
        item.telefono.trim() === data.telefono.trim()
      )
    );

    if (duplicate) {
      toast.error(
        "Ya existe un inversionista con el mismo documento, correo o teléfono"
      );
      return;
    }

    const inversionistaActualizado: Inversionista = {
      id: inversionista.id,
      nombre: data.nombre.trim(),
      documento: data.documento.trim(),
      telefono: data.telefono.trim(),
      correo: data.correo.trim().toLowerCase(),
      direccion: data.direccion.trim(),
      createdAt: inversionista.createdAt,
    };

    setActualizacionPendiente(inversionistaActualizado);
  };

  const confirmUpdate = async () => {
    if (!actualizacionPendiente) return;
    try {
      await updateInversionista(actualizacionPendiente);
      toast.success("Inversionista actualizado correctamente");
      router.push("/dashboard/Inversionista");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo actualizar el inversionista");
    }
  };

  const handleCancel = () => {
    router.push(
      "/dashboard/Inversionista"
    );
  };

  if (!inversionista) {
    return (
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Cargando inversionista...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <PageTitle
        title="Editar inversionista"
        description="Actualiza los datos del inversionista."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <InversionistaForm
          initialData={inversionista}
          isEditing={true}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </section>

      <EditInversionistaConfirmation
        inversionista={actualizacionPendiente}
        onCancel={() => setActualizacionPendiente(null)}
        onConfirm={confirmUpdate}
      />
    </div>
  );
}
