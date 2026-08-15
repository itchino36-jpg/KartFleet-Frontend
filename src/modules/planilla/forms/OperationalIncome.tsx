
"use client";

import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import {Alert,AlertDescription,AlertTitle } from "@/components/ui/alert";
import OperationalIncomeFields from "./operational-income/OperationalIncomeFields";
import type { IncomeHistoryEntry } from "./operational-income/operational-income.types";

export type { IncomeHistoryEntry } from "./operational-income/operational-income.types";

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

      <OperationalIncomeFields
        tripSource={tripSource}
        setTripSource={setTripSource}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        amount={amount}
        setAmount={setAmount}
        observations={observations}
        setObservations={setObservations}
        onSave={handleSave}
      />
    </div>
  );
}
