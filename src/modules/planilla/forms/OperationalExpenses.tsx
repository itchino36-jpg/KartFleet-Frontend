"use client";

import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import {
Alert,
AlertDescription,
AlertTitle,
} from "@/components/ui/alert";
import OperationalExpenseFields from "./operational-expenses/OperationalExpenseFields";
import type { ExpenseHistoryEntry } from "./operational-expenses/operational-expenses.types";

export type { ExpenseHistoryEntry } from "./operational-expenses/operational-expenses.types";

type OperationalExpensesProps = {
onSaved?: (entry: ExpenseHistoryEntry) => void;
};

export default function OperationalExpenses({
onSaved,
}: OperationalExpensesProps) {
const [expenseType, setExpenseType] =
useState("Combustible");

const [description, setDescription] =
useState("");

const [amount, setAmount] =
useState("");

const [observations, setObservations] =
useState("");

const [validationMessage, setValidationMessage] =
useState<string | null>(null);

const handleSave = () => {
if (!description.trim() || !amount.trim()) {
setValidationMessage(
"Completa la descripción y el monto antes de guardar el egreso operativo."
);
return;
}

setValidationMessage(null);

const createdAt = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date());

const savedEntry: ExpenseHistoryEntry = {
  id: crypto.randomUUID(),
  expenseType,
  description,
  amount,
  observations,
  createdAt,
};

onSaved?.(savedEntry);

setExpenseType("Combustible");
setDescription("");
setAmount("");
setObservations("");


};

return ( <div> <div className="mb-6 sm:mb-8"> <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
Karfleet · Planillas operativas </p>

    <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
      Egresos operativos
    </h1>

    <p className="mt-1 text-sm text-slate-500">
      Controla los gastos asociados a la operación.
    </p>
  </div>

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

  <OperationalExpenseFields
    expenseType={expenseType}
    setExpenseType={setExpenseType}
    description={description}
    setDescription={setDescription}
    amount={amount}
    setAmount={setAmount}
    observations={observations}
    setObservations={setObservations}
    onSave={handleSave}
  />
</div>


);
}
