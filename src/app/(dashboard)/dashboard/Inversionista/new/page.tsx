"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import InversionistaForm from "@/components/inversionista/InversionistaForm";
import InversionistaVehiculosModal from "@/components/inversionista/vehiculo/InversionistaVehiculosModal";
import { useInversionistas } from "@/modules/inversionista/hooks/use-inversionistas";
import { useVehiculos } from "@/modules/inversionista/hooks/use-vehiculos";
import type { InversionistaFormData } from "@/modules/inversionista/types/inversionista-form.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";
import PageTitle from "@/components/layout/PageTitle";

type PendingVehiculo = Omit<Vehiculo, "id">;

export default function NuevoInversionistaPage() {
  const router = useRouter();

  const { inversionistas, addInversionista } = useInversionistas();
  const { vehiculos, addVehiculo } = useVehiculos();
  const [pendingData, setPendingData] =
    useState<InversionistaFormData | null>(null);
  const [pendingVehiculos, setPendingVehiculos] =
    useState<PendingVehiculo[]>([]);
  const [isVehicleModalOpen, setIsVehicleModalOpen] =
    useState(false);

  const pendingInversionista = useMemo(
    () => ({
      id: "pending-inversionista",
      nombre: pendingData?.nombre ?? "Nuevo inversionista",
      documento: pendingData?.documento ?? "",
      telefono: pendingData?.telefono ?? "",
      correo: pendingData?.correo ?? "",
      direccion: pendingData?.direccion ?? "",
    }),
    [pendingData]
  );

  const handleSave = (data: InversionistaFormData) => {
    const normalizedData: InversionistaFormData = {
      nombre: data.nombre.trim(),
      documento: data.documento.trim(),
      telefono: data.telefono.trim(),
      correo: data.correo.trim().toLowerCase(),
      direccion: data.direccion.trim(),
    };

    const duplicate = inversionistas.find((inversionista) =>
      inversionista.documento.trim().toLowerCase() ===
        normalizedData.documento.toLowerCase() ||
      inversionista.correo.trim().toLowerCase() ===
        normalizedData.correo ||
      inversionista.telefono.trim() === normalizedData.telefono
    );

    if (duplicate) {
      toast.error(
        "Ya existe un inversionista con el mismo documento, correo o teléfono"
      );
      return;
    }

    setPendingData(normalizedData);
    setIsVehicleModalOpen(true);
  };

  const handleAddVehiculo = (vehiculo: PendingVehiculo) => {
    const normalizedPlate = vehiculo.placa.trim().toUpperCase();
    const plateExists = [...vehiculos, ...pendingVehiculos].some(
      (item) => item.placa.trim().toUpperCase() === normalizedPlate
    );

    if (plateExists) {
      toast.error("Ya existe un vehículo registrado con esa placa");
      return false;
    }

    setPendingVehiculos((current) => [
      ...current,
      {
        ...vehiculo,
        placa: normalizedPlate,
      },
    ]);

    toast.success("Vehículo agregado al registro");
    return true;
  };

  const handleFinish = () => {
    if (!pendingData || pendingVehiculos.length === 0) {
      toast.error("Debes agregar al menos un vehículo");
      return;
    }

    const nuevoInversionista = addInversionista(pendingData);

    pendingVehiculos.forEach((vehiculo) => {
      addVehiculo({
        ...vehiculo,
        inversionistaId: nuevoInversionista.id,
      });
    });

    toast.success(
      "Inversionista y vehículos registrados correctamente"
    );

    router.push("/dashboard/Inversionista");
  };

  const handleCancel = () => {
    router.push("/dashboard/Inversionista");
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <PageTitle
        title="Nuevo inversionista"
        description="Completa los datos y luego agrega al menos un vehículo."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <InversionistaForm
          isEditing={false}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </section>

      <InversionistaVehiculosModal
        isOpen={isVehicleModalOpen}
        inversionista={pendingInversionista}
        vehiculos={pendingVehiculos}
        onAdd={handleAddVehiculo}
        onRemove={(plate) =>
          setPendingVehiculos((current) =>
            current.filter((vehiculo) => vehiculo.placa !== plate)
          )
        }
        onBack={() => setIsVehicleModalOpen(false)}
        onFinish={handleFinish}
      />
    </div>
  );
}
