import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <button className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
          +crear planilla
        </button>

        <main className="flex-1 p-4 md:p-6">{children}</main>
        
      </div>
    </div>
  );
}