import type {
  AuthUser,
  SystemModule,
  SystemRole,
} from "@/modules/auth/types/authorization.types";

export const ROLE_LABELS: Record<SystemRole, string> = {
  superadmin: "Superadministrador",
  admin: "Administrador",
  group_manager: "Encargado de grupo",
  driver: "Conductor",
};

export const ROLE_MODULES: Record<SystemRole, SystemModule[]> = {
  superadmin: ["dashboard", "planilla", "inversionistas", "vehiculos", "seguros"],
  admin: ["dashboard", "planilla", "inversionistas", "vehiculos", "seguros"],
  // Se habilitará cuando existan grupos y asignaciones con alcance por grupo.
  group_manager: [],
  driver: ["planilla"],
};

export interface DemoUser extends AuthUser {
  password: string;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: "demo-superadmin",
    name: "Sofía Vargas",
    initials: "SV",
    email: "superadmin@karfleet.com",
    password: "12345678",
    role: "superadmin",
  },
  {
    id: "demo-admin",
    name: "Mario Chino",
    initials: "MC",
    email: "mario@gmail.com",
    password: "12435678",
    role: "admin",
  },
  {
    id: "demo-group-manager",
    name: "Elena Flores",
    initials: "EF",
    email: "encargado@karfleet.com",
    password: "12345678",
    role: "group_manager",
  },
  {
    id: "demo-driver",
    name: "Carlos Rojas",
    initials: "CR",
    email: "conductor@karfleet.com",
    password: "12345678",
    role: "driver",
  },
];
