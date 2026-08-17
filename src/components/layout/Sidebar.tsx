"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoGridOutline, IoDocumentTextOutline } from "react-icons/io5";
import {
  BriefcaseBusiness,
  CarFront,
  ChevronDown,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { sidebarItems } from "@/constants/sidebar.constants";

const iconMap = {
  Dashboard: <IoGridOutline />,
  Planilla: <IoDocumentTextOutline />,
  Inversionista: <BriefcaseBusiness />,
};

export default function Sidebar() {
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
    <aside className="relative flex h-screen w-120 flex-col border-r border-slate-800 bg-slate-950 text-white">
      <div className="pointer-events-none absolute bottom-0 right-0 flex items-end justify-end overflow-hidden">
        <span className="translate-x-6 translate-y-6 text-[14rem] font-black tracking-tight text-slate-700/70">
          K
        </span>
      </div>

      <div className="relative border-b border-slate-800 p-6">
        <h1 className="text-3xl font-bold text-white">K@R</h1>
        <p className="text-sm text-slate-400">KarFleet</p>
      </div>

      <nav className="relative flex-1 px-4 py-6">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const hasChildren = item.children?.length;

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
                      {item.children?.map((child) => (
                        <li key={child.title}>
                          <Link
                            href={child.path}
                            className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition hover:bg-slate-800 hover:text-white ${
                              isChildActive(child.title)
                                ? "bg-slate-800 text-white"
                                : "text-slate-400"
                            }`}
                          >
                            {child.title === "Usuarios" ? (
                              <UserRound className="h-4 w-4 shrink-0" />
                            ) : (
                              <CarFront className="h-4 w-4 shrink-0" />
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
