"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

import VehiculoForm from "@/components/vehiculos/VehiculoFrom";
import { useInversionistas } from "@/modules/inversionista/hooks/use-inversionistas";
import { useVehiculos } from "@/modules/inversionista/hooks/use-vehiculos";
import PageTitle from "@/components/layout/PageTitle";

import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";

export default function EditarVehiculoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { inversionistas } = useInversionistas();
  const { vehiculos, updateVehiculo } = useVehiculos();

  const vehiculo =
    vehiculos.find((item) => item.id === id) ?? null;

  const handleSave = (data: Omit<Vehiculo, "id">) => {
    if (!vehiculo) {
      return;
    }

    const plateExists = vehiculos.some(
      (item) =>
        item.id !== vehiculo.id &&
        item.placa.trim().toUpperCase() ===
          data.placa.trim().toUpperCase()
    );

    if (plateExists) {
      toast.error("Ya existe un vehículo registrado con esa placa");
      return;
    }

    updateVehiculo(vehiculo.id, data);

    toast.success("Vehículo actualizado correctamente");

    router.push("/dashboard/Inversionista/vehiculos");
  };

  const handleCancel = () => {
    router.push("/dashboard/Inversionista/vehiculos");
  };

  if (!vehiculo) {
    return (
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Cargando vehículo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <PageTitle
        title="Editar vehículo"
        description="Actualiza los datos del vehículo afiliado."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <VehiculoForm
          inversionistas={inversionistas}
          vehiculoInicial={vehiculo}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </section>
    </div>
  );
}
