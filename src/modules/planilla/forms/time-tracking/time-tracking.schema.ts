import { z } from "zod";

import type { HoursFormValues } from "./time-tracking.types";

export const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const hoursSchema = z.object({
  arrivalOffice: z.string().regex(timeRegex, "Formato HH:MM"),
  arrivalVehicle: z.string().regex(timeRegex, "Formato HH:MM"),
  leaveWork: z.string().regex(timeRegex, "Formato HH:MM"),
  returnVehicle: z.string().regex(timeRegex, "Formato HH:MM"),
  observations: z
    .string()
    .max(500, "Máximo 500 caracteres")
    .optional(),
});

export const defaultHoursValues: HoursFormValues = {
  arrivalOffice: "08:00",
  arrivalVehicle: "08:20",
  leaveWork: "18:00",
  returnVehicle: "18:20",
  observations: "",
};
