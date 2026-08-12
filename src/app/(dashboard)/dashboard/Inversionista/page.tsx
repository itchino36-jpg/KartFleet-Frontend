"use client";

import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import { useRouter } from "next/navigation";
import InversionistaForm from "@/components/inversionista/InversionistaForm";


export default function InversionistaPage() {
  const router = useRouter();

  const [inversionistas, setInversionistas] = useState<Inversionista[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("inversionistas");

    if (saved) {
      setInversionistas(JSON.parse(saved));
    }
  }, []);
  const handleSave = (datos: {
    inversionista: Inversionista;
    vehiculo?: {
      id: string;
      inversionistaId: string;
      placa: string;
      marca: string;
      modelo: string;
      año: string;
      color: string;
      tipo: string;
    };
  }) => {
    const { inversionista, vehiculo } = datos;

    if (editingInversionista) {
      const updated = inversionistas.map((item) =>
        item.id === editingInversionista.id
          ? inversionista
          : item
      );

      setInversionistas(updated);

      localStorage.setItem(
        "inversionistas",
        JSON.stringify(updated)
      );

      toast.success("Inversionista actualizado correctamente");

      handleCloseModal();

      return;
    }

    const updatedInversionistas = [
      ...inversionistas,
      inversionista,
    ];

    setInversionistas(updatedInversionistas);

    localStorage.setItem(
      "inversionistas",
      JSON.stringify(updatedInversionistas)
    );

    if (vehiculo) {
      const savedVehiculos = localStorage.getItem("vehiculos");

      const vehiculos = savedVehiculos
        ? JSON.parse(savedVehiculos)
        : [];

      const updatedVehiculos = [
        ...vehiculos,
        vehiculo,
      ];

      localStorage.setItem(
        "vehiculos",
        JSON.stringify(updatedVehiculos)
      );
    }

    toast.success(
      "Inversionista y vehículo registrados correctamente"
    );

    handleCloseModal();
  };


  const handleAdd = () => {
    setEditingInversionista(null);
    setIsModalOpen(true);
  };
  const handleEdit = (inversionista: Inversionista) => {
    setEditingInversionista(inversionista);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInversionista(null);
  };



    const inversionistaId = crypto.randomUUID();

    const inversionista: Inversionista = {
      id: inversionistaId,
      nombre,
      documento,
      telefono,
      correo,
      direccion,
    };


    const updatedInversionistas = [
      ...inversionistas,
      inversionista,
    ];

    setInversionistas(updatedInversionistas);

    localStorage.setItem(
      "inversionistas",
      JSON.stringify(updatedInversionistas)
    );


    const savedVehiculos = localStorage.getItem("vehiculos");

    const vehiculos = savedVehiculos
      ? JSON.parse(savedVehiculos)
      : [];

    const updatedVehiculos = [
      ...vehiculos,
      vehiculo,
    ];

    localStorage.setItem(
      "vehiculos",
      JSON.stringify(updatedVehiculos)
    );

    toast.success(
      "Inversionista y vehículo registrados correctamente"
    );

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este inversionista?"
    );

    if (!confirmar) {
      return;
    }

    const updated = inversionistas.filter(
      (inversionista) => inversionista.id !== id
    );

    setInversionistas(updated);

    localStorage.setItem(
      "inversionistas",
      JSON.stringify(updated)
    );

    toast.success("Inversionista eliminado correctamente");
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        <div className="flex flex-wrap items-center gap-1">

          <button
            type="button"
            className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
          >
            Inversionista
          </button>

          <button
            type="button"
            className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Contacto
          </button>

        </div>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">
              Inversionistas
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Gestión de inversionistas y vehículos afiliados.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            + Agregar nuevo
          </button>

        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Buscar inversionista..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
          />
        </div>

        {inversionistas.length === 0 ? (

          <div className="rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center">
            <p className="text-sm text-slate-500">
              No hay inversionistas registrados.
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-3 py-3 font-medium">
                    Nombre
                  </th>
                  <th className="px-3 py-3 font-medium">
                    Documento
                  </th>
                  <th className="px-3 py-3 font-medium">
                    Teléfono
                  </th>
                  <th className="px-3 py-3 font-medium">
                    Correo
                  </th>
                  <th className="px-3 py-3 font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {inversionistas.map((inversionista) => (
                  <tr
                    key={inversionista.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-3 py-3 font-medium text-slate-900">
                      {inversionista.nombre}
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {inversionista.documento}
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {inversionista.telefono}
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {inversionista.correo}
                    </td>

                    <td className="px-3 py-3">

                      <div className="flex flex-wrap items-center gap-2">

                        <button
                          type="button"
                          onClick={() => {
                            router.push(
                              `/dashboard/Inversionista/${inversionista.id}`
                            );
                          }}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Ver
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(inversionista)
                          }
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(inversionista.id)
                          }
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {isModalOpen && (
      <InversionistaForm
        inversionista={editingInversionista}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    )}
    </div>
  );
}