export type FuelHistoryEntry = {
  id: string;
  fuelStart: string;
  fuelEnd: string;
  gasStart?: string;
  gasEnd?: string;
  vehicleType?: string;
  odometerStart: string;
  odometerEnd: string;
  observations: string;
  createdAt: string;
};
