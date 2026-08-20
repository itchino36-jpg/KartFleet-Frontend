"use client";

import InversionistaForm from "@/components/inversionista/InversionistaForm";
import { DeleteVehiculoConfirmation } from "@/components/inversionista/new/DeleteVehiculoConfirmation";
import { InversionistaStepIndicator } from "@/components/inversionista/new/InversionistaStepIndicator";
import { InversionistaVehicleStep } from "@/components/inversionista/new/InversionistaVehicleStep";
import PageTitle from "@/components/layout/PageTitle";
import { useNuevoInversionista } from "@/modules/inversionista/hooks/use-nuevo-inversionista";

export default function NuevoInversionistaPage() {
  const flow = useNuevoInversionista();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-3">
      <PageTitle
        title="Nuevo inversionista"
        description="Completa los dos pasos para registrar el inversionista y su vehículo."
      />

      <InversionistaStepIndicator paso={flow.paso} />

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {flow.paso === 1 || !flow.pendingData ? (
          <InversionistaForm
            initialData={flow.pendingInversionista}
            isEditing={false}
            onSave={flow.saveInversionistaDraft}
            onCancel={flow.cancel}
          />
        ) : (
          <InversionistaVehicleStep
            inversionista={flow.pendingInversionista}
            vehiculos={flow.pendingVehiculos}
            vehiculoEnEdicion={flow.vehiculoEnEdicion}
            formKey={flow.vehicleFormKey}
            onSave={flow.saveVehiculoDraft}
            onEdit={flow.editVehiculo}
            onDelete={flow.requestDeleteVehiculo}
            onCancelForm={flow.cancelVehicleForm}
            onFinish={flow.finish}
            isSaving={flow.isSaving}
          />
        )}
      </section>

      <DeleteVehiculoConfirmation
        placa={flow.placaAEliminar}
        onCancel={flow.cancelDeleteVehiculo}
        onConfirm={flow.confirmDeleteVehiculo}
      />
    </div>
  );
}
