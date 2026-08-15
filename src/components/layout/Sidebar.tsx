"use client";

import Link from "next/link";
import { IoGridOutline, IoDocumentTextOutline } from "react-icons/io5";
import { BriefcaseBusiness, ChevronDown } from "lucide-react";
import { useState } from "react";
import { sidebarItems } from "@/constants/sidebar.constants";

const iconMap = {
  Dashboard: <IoGridOutline />,
  Planilla: <IoDocumentTextOutline />,
  Inversionista: <BriefcaseBusiness />,
};

export default function Sidebar() {
  const [isInvestorOpen, setIsInvestorOpen] = useState(false);

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
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800 hover:text-white"
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

                  {isInvestorOpen && (
                    <ul className="mt-1 space-y-1 pl-4">
                      {item.children?.map((child) => (
                        <li key={child.title}>
                          <Link
                            href={child.path}
                            className="block rounded-lg px-4 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
