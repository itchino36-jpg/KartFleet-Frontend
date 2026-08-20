"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, DoorOpen, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/modules/auth/types/authorization.types";
import { ROLE_LABELS } from "@/modules/auth/constants/authorization.constants";
import { clearSession } from "@/modules/auth/services/session.service";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";

interface HeaderProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
  user: AuthUser;
}

export default function Header({ isSidebarOpen, onMenuClick, user }: HeaderProps) {
  const router = useRouter();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (!isProfileOpen) return;

    const closeMenu = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setIsProfileOpen(false);
        return;
      }

      if (
        event instanceof MouseEvent &&
        !profileMenuRef.current?.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeMenu);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    setIsProfileOpen(false);
    clearSession();
    router.replace("/");
  };

  return (
    <header className="flex h-16 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 sm:h-20 sm:px-4 md:px-8">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menú lateral"
          aria-controls="dashboard-sidebar"
          aria-expanded={isSidebarOpen}
          tabIndex={isSidebarOpen ? -1 : 0}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 active:scale-95 sm:h-11 sm:w-11 ${
            isSidebarOpen ? "pointer-events-none invisible opacity-0" : "visible opacity-100"
          }`}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-slate-800 sm:text-xl">KarFleet</h1>
          <p className="hidden text-sm text-slate-500 sm:block">Sistema de gestión de flota</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-5">
        <button type="button" aria-label="Notificaciones" className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 min-[400px]:flex">
          <IoNotificationsOutline className="text-xl" />
        </button>
        <button type="button" aria-label="Configuración" className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 sm:flex">
          <IoSettingsOutline className="text-xl" />
        </button>
        <div ref={profileMenuRef} className="relative sm:w-48">
          <button
            type="button"
            onClick={() => setIsProfileOpen((open) => !open)}
            aria-label="Abrir menú de usuario"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            className={`relative z-[51] flex w-full items-center gap-2 border border-transparent p-1 transition sm:gap-2 sm:px-2 ${
              isProfileOpen
                ? "rounded-t-xl border-slate-200 border-b-white bg-white shadow-sm"
                : "rounded-xl hover:bg-slate-100"
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm text-white sm:h-10 sm:w-10">{user.initials}</span>
            <span className="hidden text-left sm:block">
              <span className="block truncate text-sm font-medium text-slate-800">{user.name}</span>
              <span className="block truncate text-xs text-slate-500">{ROLE_LABELS[user.role]}</span>
            </span>
            <ChevronDown
              className={`hidden h-4 w-4 text-slate-500 transition-transform duration-200 sm:block ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`absolute right-0 top-[calc(100%-1px)] z-50 grid w-44 origin-top overflow-hidden rounded-b-xl rounded-tl-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 sm:w-full sm:rounded-t-none ${
              isProfileOpen
                ? "grid-rows-[1fr] translate-y-0 opacity-100"
                : "pointer-events-none grid-rows-[0fr] -translate-y-1 opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="border-b border-slate-100 px-3 py-2 sm:hidden">
                <p className="truncate text-sm font-medium text-slate-800">{user.name}</p>
                <p className="truncate text-xs text-slate-500">{ROLE_LABELS[user.role]}</p>
              </div>
              <div className="p-1.5">
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <DoorOpen className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
