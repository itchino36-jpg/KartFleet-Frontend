import type { SystemModule, SystemRole } from "@/modules/auth/types/authorization.types";

export const ROLE_LABELS: Record<SystemRole, string> = {
  superadmin: "Superadministrador",
  admin: "Administrador",
  group_manager: "Encargado de grupo",
  driver: "Conductor",
};

export const ROLE_MODULES: Record<SystemRole, SystemModule[]> = {
  superadmin: ["dashboard", "planilla", "inversionistas", "vehiculos", "seguros"],
  admin: ["dashboard", "planilla", "inversionistas", "vehiculos", "seguros"],
  group_manager: [],
  driver: ["planilla"],
};
