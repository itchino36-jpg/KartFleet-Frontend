"use client";

import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useInversionistas } from "@/modules/inversionista/hooks/use-inversionistas";
import InversionistasTable from "@/components/inversionista/InversionistasTable";
import PageTitle from "@/components/layout/PageTitle";

export default function InversionistaPage() {
  const router = useRouter();

  const {
    inversionistas,
    deleteInversionista,
  } = useInversionistas();

  const handleAdd = () => {
    router.push("/dashboard/Inversionista/new");
  };

  const handleDelete = (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este inversionista?");
    if (!confirmar) {
      return;
    }
    deleteInversionista(id);
    toast.success("Inversionista eliminado correctamente");
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        <div className="flex flex-wrap items-center gap-1">

          <button
            type="button"
            className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
            Inversionista
          </button>

          <button
            type="button"
            className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
            Contacto
          </button>

        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageTitle
            title="Inversionistas"
            description="Gestión de inversionistas y vehículos afiliados."
          />

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Agregar nuevo
          </button>
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Buscar inversionista..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"/>
        </div>

        <InversionistasTable
          inversionistas={inversionistas}
          onView={(id) => router.push(`/dashboard/Inversionista/${id}`)}
          onEdit={(inversionista) =>
            router.push(`/dashboard/Inversionista/${inversionista.id}/edit`)
          }
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
