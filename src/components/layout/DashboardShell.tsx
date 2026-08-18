"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/Sidebar";
import type { AuthUser } from "@/modules/auth/types/authorization.types";
import {
  canAccessModule,
  getCurrentUser,
  getFirstAllowedRoute,
  getModuleForPath,
} from "@/modules/auth/services/session.service";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);
  const [authState, setAuthState] = useState<{
    checked: boolean;
    user: AuthUser | null;
  }>({ checked: false, user: null });

  useEffect(() => {
    queueMicrotask(() => {
      const user = getCurrentUser();
      setAuthState({ checked: true, user });

      if (!user) {
        router.replace("/");
        return;
      }

      if (!canAccessModule(user, getModuleForPath(pathname))) {
        router.replace(getFirstAllowedRoute(user) ?? "/");
      }
    });
  }, [pathname, router]);

  useEffect(() => {
    if (!loadingPath || pathname !== loadingPath) return;
    const timer = window.setTimeout(() => setLoadingPath(null), 450);
    return () => window.clearTimeout(timer);
  }, [loadingPath, pathname]);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isSidebarOpen]);

  if (!authState.checked || !authState.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
      </div>
    );
  }

  const currentModule = getModuleForPath(pathname);
  if (!canAccessModule(authState.user, currentModule)) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={authState.user}
        onNavigate={(path) => {
          if (path !== pathname) setLoadingPath(path);
        }}
      />
      <div
        className={`flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-out ${
          isSidebarOpen ? "lg:ml-80" : "ml-0"
        }`}
      >
        <Header
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(true)}
          user={authState.user}
        />
        <main className="relative min-w-0 flex-1 overflow-x-hidden p-3 sm:p-4 md:p-6">
          {children}
          {loadingPath && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center bg-slate-200/75 backdrop-blur-[2px]"
              role="status"
              aria-live="polite"
              aria-label="Cargando módulo"
            >
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/80 px-7 py-5 shadow-sm ring-1 ring-slate-200">
                <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />
                <span className="text-sm font-semibold text-slate-700">Cargando...</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
