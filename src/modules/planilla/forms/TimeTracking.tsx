
"use client";

// Control Horas - SOLO FORMULARIO

import { AlertCircleIcon } from "lucide-react";
import { useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/toast";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const hoursSchema = z.object({
  arrivalOffice: z
    .string()
    .regex(timeRegex, "Formato HH:MM"),

  arrivalVehicle: z
    .string()
    .regex(timeRegex, "Formato HH:MM"),

  leaveWork: z
    .string()
    .regex(timeRegex, "Formato HH:MM"),

  returnVehicle: z
    .string()
    .regex(timeRegex, "Formato HH:MM"),

  observations: z
    .string()
    .max(500, "Máximo 500 caracteres")
    .optional(),
});

export type HoursFormValues = z.infer<typeof hoursSchema>;

export type HoursHistoryEntry = HoursFormValues & {
  id: string;
  createdAt: string;
  hoursWorked: string;
  effectiveHours: string;
};

const defaultHoursValues: HoursFormValues = {
  arrivalOffice: "08:00",
  arrivalVehicle: "08:20",
  leaveWork: "18:00",
  returnVehicle: "18:20",
  observations: "",
};

const parseTime = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);

  return hours * 60 + minutes;
};

const formatDuration = (minutes: number) => {
  return (minutes / 60).toFixed(2);
};

export const getHoursMetrics = (
  values: Pick<
    HoursFormValues,
    | "arrivalOffice"
    | "arrivalVehicle"
    | "leaveWork"
    | "returnVehicle"
  >
) => {
  const times = [
    values.arrivalOffice,
    values.arrivalVehicle,
    values.leaveWork,
    values.returnVehicle,
  ];

  if (!times.every((value) => timeRegex.test(value ?? ""))) {
    return {
      hoursWorked: "0.00",
      effectiveHours: "0.00",
    };
  }

  const officeMinutes = parseTime(
    values.arrivalOffice ?? "00:00"
  );

  const vehicleMinutes = parseTime(
    values.arrivalVehicle ?? "00:00"
  );

  const leaveMinutes = parseTime(
    values.leaveWork ?? "00:00"
  );

  const returnMinutes = parseTime(
    values.returnVehicle ?? "00:00"
  );

  const hoursWorked = Math.max(
    0,
    leaveMinutes - officeMinutes
  );

  const effectiveHours = Math.max(
    0,
    returnMinutes - vehicleMinutes
  );

  return {
    hoursWorked: formatDuration(hoursWorked),
    effectiveHours: formatDuration(effectiveHours),
  };
};

function TimeField({
  label,
  registration,
  error,
  disabled,
}: {
  label: string;

  registration: ReturnType<
    ReturnType<typeof useForm<HoursFormValues>>["register"]
  >;

  error?: string;

  disabled?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[13px] font-medium text-slate-600">
        {label}
      </span>

      <input
        type="time"
        step="60"
        {...registration}
        disabled={disabled}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[15px]"
      />

      {error && (
        <p className="text-xs font-medium text-rose-600">
          {error}
        </p>
      )}
    </label>
  );
}

type HoursTrackingProps = {
  onSaved?: (entry: HoursHistoryEntry) => void;
};

export default function HoursTracking({
  onSaved,
}: HoursTrackingProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<HoursFormValues>({
    resolver: zodResolver(hoursSchema),
    defaultValues: defaultHoursValues,
  });

  const [
    arrivalOffice,
    arrivalVehicle,
    leaveWork,
    returnVehicle,
  ] = watch([
    "arrivalOffice",
    "arrivalVehicle",
    "leaveWork",
    "returnVehicle",
  ]);

  const metrics = useMemo(
    () =>
      getHoursMetrics({
        arrivalOffice,
        arrivalVehicle,
        leaveWork,
        returnVehicle,
      }),
    [
      arrivalOffice,
      arrivalVehicle,
      leaveWork,
      returnVehicle,
    ]
  );

  const hasValidationErrors =
    Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<HoursFormValues> = async (
    data
  ) => {
    const createdAt = new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const savedEntry: HoursHistoryEntry = {
      ...data,

      id: crypto.randomUUID(),

      createdAt,

      ...getHoursMetrics({
        arrivalOffice: data.arrivalOffice,
        arrivalVehicle: data.arrivalVehicle,
        leaveWork: data.leaveWork,
        returnVehicle: data.returnVehicle,
      }),
    };

    /*
     * El formulario NO administra el historial.
     *
     * Le entrega el registro guardado al componente padre
     * mediante onSaved().
     */
    onSaved?.(savedEntry);

    toast.success(
      "Registro de horas creado correctamente"
    );

    reset(defaultHoursValues);
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
      {/* ENCABEZADO */}

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

      {/* ALERTA */}

      {hasValidationErrors && (
        <Alert
          variant="destructive"
          className="mb-4 max-w-full border-rose-200 bg-rose-50 text-rose-900"
        >
          <AlertCircleIcon />

          <AlertTitle>
            Datos incompletos o inválidos
          </AlertTitle>

          <AlertDescription>
            Revisa los campos marcados con error antes de
            guardar el registro de horas.
          </AlertDescription>
        </Alert>
      )}

      {/* FORMULARIO */}

        <form
          onSubmit={handleSubmit(
            onSubmit,
            () => {
              toast.error(
                "Revisa los datos obligatorios del formulario"
              );
            }
          )}
          className="space-y-8"
        >
        {/* HORARIOS */}

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

        {/* RESUMEN DE HORAS */}

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-2xl bg-slate-900 p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-300 sm:text-sm">
              Horas trabajadas
            </p>

            <p className="mt-1.5 text-2xl font-semibold text-white sm:mt-2 sm:text-3xl">
              {metrics.hoursWorked}

              <span className="ml-1 text-sm font-normal text-slate-400">
                h
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Horas efectivas
            </p>

            <p className="mt-1.5 text-2xl font-semibold text-slate-900 sm:mt-2 sm:text-3xl">
              {metrics.effectiveHours}

              <span className="ml-1 text-sm font-normal text-slate-400">
                h
              </span>
            </p>
          </div>
        </div>

        {/* OBSERVACIONES */}

        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-slate-600">
            Observaciones
          </span>

          <textarea
            rows={5}
            placeholder="Incidencias, retrasos u otras notas de la jornada"
            {...register("observations")}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          />

          {errors.observations && (
            <p className="text-xs font-medium text-rose-600">
              {errors.observations.message}
            </p>
          )}
        </label>

        {/* BOTONES */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => reset(defaultHoursValues)}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
          >
            Limpiar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Guardando…"
              : "Guardar registro"}
          </button>
        </div>
      </form>
    </div>
  );
}
