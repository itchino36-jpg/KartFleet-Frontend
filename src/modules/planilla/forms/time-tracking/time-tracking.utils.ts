import { timeRegex } from "./time-tracking.schema";
import type { HoursFormValues } from "./time-tracking.types";

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

  const officeMinutes = parseTime(values.arrivalOffice ?? "00:00");
  const vehicleMinutes = parseTime(values.arrivalVehicle ?? "00:00");
  const leaveMinutes = parseTime(values.leaveWork ?? "00:00");
  const returnMinutes = parseTime(values.returnVehicle ?? "00:00");

  const hoursWorked = Math.max(0, leaveMinutes - officeMinutes);
  const effectiveHours = Math.max(0, returnMinutes - vehicleMinutes);

  return {
    hoursWorked: formatDuration(hoursWorked),
    effectiveHours: formatDuration(effectiveHours),
  };
};
