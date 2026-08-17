export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    title: "Planilla",
    path: "/dashboard/planilla",
  },
  {
    title: "Inversionista",
    path: "/dashboard/Inversionista",
    children: [
      {
        title: "Usuarios",
        path: "/dashboard/Inversionista",
      },
      {
        title: "Vehículos",
        path: "/dashboard/Inversionista/vehiculos",
      },
    ],
  },
];
