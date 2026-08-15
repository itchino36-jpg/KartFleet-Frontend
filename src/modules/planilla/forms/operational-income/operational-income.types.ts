export type IncomeHistoryEntry = {
  id: string;
  company: "Karma";
  tripSource: "yango" | "indrive" | "externo";
  paymentType: string;
  amount: string;
  observations: string;
  createdAt: string;
};
