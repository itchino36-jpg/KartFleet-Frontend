import type { SystemModule } from "@/modules/auth/types/authorization.types";

export interface SidebarItem {
  title: string;
  path: string;
  module: SystemModule;
  children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    module: "dashboard",
  },
  {
    title: "Planilla",
    path: "/dashboard/planilla",
    module: "planilla",
  },
  {
    title: "Seguros",
    path: "/dashboard/seguros",
    module: "seguros",
  },
  {
    title: "Gestión de inversionista",
    path: "/dashboard/Inversionista",
    module: "inversionistas",
    children: [
      {
        title: "Inversionista",
        path: "/dashboard/Inversionista",
        module: "inversionistas",
      },
      {
        title: "Vehículos",
        path: "/dashboard/Inversionista/vehiculos",
        module: "vehiculos",
      },
    ],
  },
];
