"use client";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useInversionistas } from "@/modules/inversionista/hooks/use-inversionistas";
import InversionistasTable from "@/components/inversionista/InversionistasTable";
import { DeleteInversionistaConfirmation } from "@/components/inversionista/DeleteInversionistaConfirmation";
import { useVehiculos } from "@/modules/vehiculo/hooks/use-vehiculos";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { InversionistaFormData } from "@/modules/inversionista/types/inversionista.types";
import { EditInversionistaModal } from "@/components/inversionista/EditInversionistaModal";
import { EditInversionistaConfirmation } from "@/components/inversionista/EditInversionistaConfirmation";
import { InversionistaExportButtons } from "@/components/inversionista/export/InversionistaExportButtons";

export default function InversionistaPage() {
  const router = useRouter();
  const [inversionistaAEliminar, setInversionistaAEliminar] =
    useState<Inversionista | null>(null);
  const [inversionistaAEditar, setInversionistaAEditar] =
    useState<Inversionista | null>(null);
  const [actualizacionPendiente, setActualizacionPendiente] =
    useState<Inversionista | null>(null);

  const {
    inversionistas,
    error,
    deleteInversionista,
    updateInversionista,
  } = useInversionistas();
  const { vehiculos, deleteVehiculo } = useVehiculos();

  const handleAdd = () => {
    router.push("/dashboard/Inversionista/new");
  };

  const handleDelete = (id: string) => {
    setInversionistaAEliminar(
      inversionistas.find((inversionista) => inversionista.id === id) ?? null
    );
  };

  const confirmDelete = async () => {
    if (!inversionistaAEliminar) return;
    try {
      await Promise.all(vehiculos.filter((vehiculo) => vehiculo.inversionistaId === inversionistaAEliminar.id).map((vehiculo) => deleteVehiculo(vehiculo.id)));
      deleteInversionista(inversionistaAEliminar.id);
      setInversionistaAEliminar(null);
      toast.success("Inversionista eliminado correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudieron eliminar los vehículos del inversionista");
    }
  };

  const cantidadVehiculos = inversionistaAEliminar
    ? vehiculos.filter(
        (vehiculo) => vehiculo.inversionistaId === inversionistaAEliminar.id
      ).length
    : 0;

  const prepareUpdate = (data: InversionistaFormData) => {
    if (!inversionistaAEditar) return;

    const duplicate = inversionistas.some(
      (item) =>
        item.id !== inversionistaAEditar.id &&
        (item.documento.trim().toLowerCase() === data.documento.trim().toLowerCase() ||
          item.correo.trim().toLowerCase() === data.correo.trim().toLowerCase() ||
          item.telefono.trim() === data.telefono.trim())
    );

    if (duplicate) {
      toast.error("Ya existe un inversionista con el mismo documento, correo o teléfono");
      return;
    }

    setActualizacionPendiente({
      id: inversionistaAEditar.id,
      nombre: data.nombre.trim(),
      documento: data.documento.trim(),
      telefono: data.telefono.trim(),
      correo: data.correo.trim().toLowerCase(),
      direccion: data.direccion.trim(),
      createdAt: inversionistaAEditar.createdAt,
    });
  };

  const confirmUpdate = async () => {
    if (!actualizacionPendiente) return;
    try {
      await updateInversionista(actualizacionPendiente);
      setActualizacionPendiente(null);
      setInversionistaAEditar(null);
      toast.success("Inversionista actualizado correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo actualizar el inversionista");
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Inversionistas
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gestión de inversionistas registrados.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <InversionistaExportButtons inversionistas={inversionistas} />
          <button
            type="button"
            onClick={handleAdd}
            className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto">
            + Agregar nuevo
          </button>
        </div>
      </div>
      </section>

      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <InversionistasTable
          inversionistas={inversionistas}
          onView={(id) => router.push(`/dashboard/Inversionista/${id}`)}
          onEdit={setInversionistaAEditar}
          onDelete={handleDelete}
      />

      <DeleteInversionistaConfirmation
        key={inversionistaAEliminar?.id ?? "sin-inversionista"}
        inversionista={inversionistaAEliminar}
        cantidadVehiculos={cantidadVehiculos}
        onCancel={() => setInversionistaAEliminar(null)}
        onConfirm={confirmDelete}
      />

      <EditInversionistaModal
        inversionista={inversionistaAEditar}
        onClose={() => setInversionistaAEditar(null)}
        onSave={prepareUpdate}
      />

      <EditInversionistaConfirmation
        inversionista={actualizacionPendiente}
        onCancel={() => setActualizacionPendiente(null)}
        onConfirm={confirmUpdate}
      />
    </div>
  );
}
