"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoGridOutline, IoDocumentTextOutline } from "react-icons/io5";
import {
  BriefcaseBusiness,
  CarFront,
  ChevronDown,
  X,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { sidebarItems } from "@/constants/sidebar.constants";
import type { AuthUser } from "@/modules/auth/types/authorization.types";
import { canAccessModule } from "@/modules/auth/services/session.service";

const iconMap = {
  Dashboard: <IoGridOutline />,
  Planilla: <IoDocumentTextOutline />,
  "Gestión de inversionista": <BriefcaseBusiness />,
  Seguros: <ShieldCheck />,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser;
  onNavigate: (path: string) => void;
}

export default function Sidebar({ isOpen, onClose, user, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const isInvestorPath = pathname.startsWith("/dashboard/Inversionista");
  const isVehiclePath = pathname.startsWith(
    "/dashboard/Inversionista/vehiculos"
  );
  const [isInvestorOpen, setIsInvestorOpen] = useState(isInvestorPath);

  const isChildActive = (title: string) =>
    title === "Vehículos"
      ? isVehiclePath
      : isInvestorPath && !isVehiclePath;

  return (
    <aside
      id="dashboard-sidebar"
      aria-hidden={!isOpen}
      className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-[min(20rem,88vw)] flex-col border-r border-slate-800 bg-slate-950 text-white shadow-2xl transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="pointer-events-none absolute bottom-0 right-0 flex items-end justify-end overflow-hidden">
        <span className="translate-x-6 translate-y-6 text-[14rem] font-black tracking-tight text-slate-700/70">
          K
        </span>
      </div>

      <div className="relative flex min-h-20 items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">K@R</h1>
          <p className="text-xs text-slate-400 sm:text-sm">KarFleet</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú lateral"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-800 hover:text-white active:scale-95"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="relative flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
        <ul className="space-y-2">
          {sidebarItems
            .filter((item) => canAccessModule(user, item.module))
            .map((item) => {
            const allowedChildren = item.children?.filter((child) =>
              canAccessModule(user, child.module)
            );
            const hasChildren = allowedChildren?.length;

            if (hasChildren) {
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setIsInvestorOpen((prev) => !prev)}
                    aria-expanded={isInvestorOpen}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition hover:bg-slate-800 hover:text-white ${
                      isInvestorPath
                        ? "bg-slate-800 text-white"
                        : "text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl text-slate-300">
                        {iconMap[item.title as keyof typeof iconMap]}
                      </span>

                      <span>{item.title}</span>
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isInvestorOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isInvestorOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                    <ul className="mt-1 space-y-1 pl-4">
                      {allowedChildren?.map((child) => (
                        <li key={child.title}>
                          <Link
                            href={child.path}
                            onClick={() => onNavigate(child.path)}
                            className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition hover:bg-slate-800 hover:text-white ${
                              isChildActive(child.title)
                                ? "bg-slate-800 text-white"
                                : "text-slate-400"
                            }`}
                          >
                            {child.title === "Vehículos" ? (
                              <CarFront className="h-4 w-4 shrink-0" />
                            ) : (
                              <UserRound className="h-4 w-4 shrink-0" />
                            )}
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.title}>
                <Link
                  href={item.path}
                  onClick={() => onNavigate(item.path)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800 hover:text-white"
                >
                  <span className="text-xl text-slate-300">
                    {iconMap[item.title as keyof typeof iconMap]}
                  </span>

                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
