export type HoursFormValues = {
  arrivalOffice: string;
  arrivalVehicle: string;
  leaveWork: string;
  returnVehicle: string;
  observations?: string;
};

export type HoursHistoryEntry = HoursFormValues & {
  id: string;
  createdAt: string;
  hoursWorked: string;
  effectiveHours: string;
};
