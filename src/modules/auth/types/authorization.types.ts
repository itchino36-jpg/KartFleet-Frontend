export type SystemRole =
  | "superadmin"
  | "admin"
  | "group_manager"
  | "driver";

export type SystemModule =
  | "dashboard"
  | "planilla"
  | "inversionistas"
  | "vehiculos"
  | "seguros";

export interface AuthUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: SystemRole;
}
