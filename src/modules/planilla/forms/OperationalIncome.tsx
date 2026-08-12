
"use client";

import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import {Alert,AlertDescription,AlertTitle } from "@/components/ui/alert";

export type IncomeHistoryEntry = {
  id: string;
  company: "Karma";
  tripSource: "yango" | "indrive" | "externo";
  paymentType: string;
  amount: string;
  observations: string;
  createdAt: string;
};

type OperationalIncomeProps = {
  onSaved?: (entry: IncomeHistoryEntry) => void;
};

export default function OperationalIncome({
  onSaved,
}: OperationalIncomeProps) {
  const [tripSource, setTripSource] =
    useState<IncomeHistoryEntry["tripSource"]>("yango");

  const [paymentType, setPaymentType] =
    useState("Efectivo");

  const [amount, setAmount] = useState("");

  const [observations, setObservations] =
    useState("");

  const [validationMessage, setValidationMessage] =
    useState<string | null>(null);

  const handleSave = () => {
    if (!amount.trim()) {
      setValidationMessage(
        "Escribe el monto antes de guardar el ingreso operativo."
      );

      return;
    }

    setValidationMessage(null);

    const createdAt = new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const savedEntry: IncomeHistoryEntry = {
      id: crypto.randomUUID(),
      company: "Karma",
      tripSource,
      paymentType,
      amount,
      observations,
      createdAt,
    };

    /*
     * El formulario NO administra el historial.
     *
     * Entrega el registro guardado al componente padre
     * mediante onSaved().
     */
    onSaved?.(savedEntry);

    setTripSource("yango");
    setPaymentType("Efectivo");
    setAmount("");
    setObservations("");
  };

  return (
    <div>
      {/* ENCABEZADO */}

      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Karfleet · Planillas operativas
        </p>

        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Ingresos operativos
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Registra cada ingreso asociado a la operación.
        </p>
      </div>

      {/* ALERTA */}

      {validationMessage && (
        <Alert
          variant="destructive"
          className="mb-4 max-w-full border-rose-200 bg-rose-50 text-rose-900"
        >
          <AlertCircleIcon />

          <AlertTitle>
            Datos incompletos
          </AlertTitle>

          <AlertDescription>
            {validationMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* FORMULARIO */}

      <form className="grid gap-4 sm:grid-cols-2">

        {/* EMPRESA */}

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            Empresa
          </span>

          <input
            type="text"
            value="Karma"
            disabled
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-base font-medium text-slate-700 outline-none disabled:cursor-not-allowed"
          />
        </label>

        {/* ORIGEN DE LA CARRERA */}

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            Origen de la carrera
          </span>

          <select
            value={tripSource}
            onChange={(event) =>
              setTripSource(
                event.target.value as IncomeHistoryEntry["tripSource"]
              )
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          >
            <option value="yango">
              Yango
            </option>

            <option value="indrive">
              InDrive
            </option>

            <option value="externo">
              Externo
            </option>
          </select>
        </label>

        {/* TIPO DE PAGO */}

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            Tipo de pago
          </span>

          <select
            value={paymentType}
            onChange={(event) =>
              setPaymentType(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          >
            <option value="Efectivo">
              Efectivo
            </option>

            <option value="Transferencia">
              QR
            </option>

            <option value="Tarjeta">
              Tarjeta
            </option>
          </select>
        </label>

        {/* MONTO */}

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            Monto (Bs)
          </span>

          <input
            type="number"
            min={0}
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        {/* OBSERVACIONES */}

        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-[13px] font-medium text-slate-600">
            Observaciones
          </span>

          <textarea
            rows={3}
            value={observations}
            onChange={(event) =>
              setObservations(event.target.value)
            }
            placeholder="Detalle del cobro o comentario interno"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
          />
        </label>

        {/* BOTÓN */}

        <div className="flex justify-end sm:col-span-2">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Guardar ingreso
          </button>
        </div>
      </form>
    </div>
  );
}