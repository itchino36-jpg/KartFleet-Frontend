"use client";
//contorl horas

import { useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const hoursSchema = z.object({
  arrivalOffice: z.string().regex(timeRegex, "Formato HH:MM"),
  arrivalVehicle: z.string().regex(timeRegex, "Formato HH:MM"),
  leaveWork: z.string().regex(timeRegex, "Formato HH:MM"),
  returnVehicle: z.string().regex(timeRegex, "Formato HH:MM"),
  observations: z.string().max(500).optional(),
});

type HoursFormValues = z.infer<typeof hoursSchema>;

const parseTime = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};

const formatDuration = (minutes: number) => (minutes / 60).toFixed(2);

// Reusable field wrapper: keeps label / input / error consistent everywhere
function TimeField({
  label,
  registration,
  error,
  disabled,
}: {
  label: string;
  registration: ReturnType<ReturnType<typeof useForm<HoursFormValues>>["register"]>;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[13px] font-medium text-slate-600">{label}</span>
      <input
        type="time"
        step="60"
        {...registration}
        disabled={disabled}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[15px]"
      />
      {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
    </label>
  );
}

export default function HoursTracking() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HoursFormValues>({
    resolver: zodResolver(hoursSchema),
    defaultValues: {
      arrivalOffice: "08:00",
      arrivalVehicle: "08:20",
      leaveWork: "18:00",
      returnVehicle: "18:20",
      observations: "",
    },
  });

  const [arrivalOffice, arrivalVehicle, leaveWork, returnVehicle] = watch([
    "arrivalOffice",
    "arrivalVehicle",
    "leaveWork",
    "returnVehicle",
  ]);

  const metrics = useMemo(() => {
    const values = [arrivalOffice, arrivalVehicle, leaveWork, returnVehicle];
    if (!values.every((value) => timeRegex.test(value ?? ""))) {
      return { hoursWorked: "0.00", effectiveHours: "0.00" };
    }

    const officeMinutes = parseTime(arrivalOffice ?? "00:00");
    const vehicleMinutes = parseTime(arrivalVehicle ?? "00:00");
    const leaveMinutes = parseTime(leaveWork ?? "00:00");
    const returnMinutes = parseTime(returnVehicle ?? "00:00");

    const hoursWorked = Math.max(0, leaveMinutes - officeMinutes);
    const effectiveHours = Math.max(0, returnMinutes - vehicleMinutes);

    return {
      hoursWorked: formatDuration(hoursWorked),
      effectiveHours: formatDuration(effectiveHours),
    };
  }, [arrivalOffice, arrivalVehicle, leaveWork, returnVehicle]);

  const onSubmit: SubmitHandler<HoursFormValues> = async (data) => {
    alert(
      `Guardado\nHora de llegada a oficina: ${data.arrivalOffice}\nHora de llegada al vehículo: ${data.arrivalVehicle}\nHora de salida del trabajo: ${data.leaveWork}\nHora de entrega del vehículo: ${data.returnVehicle}\nHoras trabajadas: ${metrics.hoursWorked}\nHoras efectivas: ${metrics.effectiveHours}\nObservaciones: ${data.observations}`
    );
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Karfleet · Planillas operativas
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Control de horas
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Registra la jornada y el uso del vehículo.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <TimeField
            label="Hora de llegada a oficina"
            registration={register("arrivalOffice")}
            error={errors.arrivalOffice?.message}
            disabled={isSubmitting}
          />
          <TimeField
            label="Hora de llegada al vehículo"
            registration={register("arrivalVehicle")}
            error={errors.arrivalVehicle?.message}
            disabled={isSubmitting}
          />
          <TimeField
            label="Hora de salida del trabajo"
            registration={register("leaveWork")}
            error={errors.leaveWork?.message}
            disabled={isSubmitting}
          />
          <TimeField
            label="Hora de entrega del vehículo"
            registration={register("returnVehicle")}
            error={errors.returnVehicle?.message}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-2xl bg-slate-900 p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-300 sm:text-sm">
              Horas trabajadas
            </p>
            <p className="mt-1.5 text-2xl font-semibold text-white sm:mt-2 sm:text-3xl">
              {metrics.hoursWorked}
              <span className="ml-1 text-sm font-normal text-slate-400">h</span>
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Horas efectivas
            </p>
            <p className="mt-1.5 text-2xl font-semibold text-slate-900 sm:mt-2 sm:text-3xl">
              {metrics.effectiveHours}
              <span className="ml-1 text-sm font-normal text-slate-400">h</span>
            </p>
          </div>
        </div>

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">Observaciones</span>
          <textarea
            rows={5}
            placeholder="Incidencias, retrasos u otras notas de la jornada"
            {...register("observations")}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          />
          {errors.observations && (
            <p className="text-xs font-medium text-rose-600">{errors.observations.message}</p>
          )}
        </label>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
          >
            Limpiar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Guardando…" : "Guardar registro"}
          </button>
        </div>
      </form>
    </div>
  );
}