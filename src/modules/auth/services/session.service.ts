import { ROLE_MODULES } from "@/modules/auth/constants/authorization.constants";
import type {
  AuthUser,
  SystemModule,
} from "@/modules/auth/types/authorization.types";
import type { LoginUser } from "@/modules/auth/types/login.types";

const SESSION_KEY = "karfleet-demo-session";
export const ACCESS_TOKEN_KEY = "karfleet_access_token";
export const USER_KEY = "karfleet_user";

export function saveAuthenticatedSession(accessToken: string, user: LoginUser) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

export function saveSession(user: AuthUser, rememberMe: boolean) {
  const targetStorage = rememberMe ? localStorage : sessionStorage;
  const otherStorage = rememberMe ? sessionStorage : localStorage;
  otherStorage.removeItem(SESSION_KEY);
  targetStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const authenticatedUser = localStorage.getItem(USER_KEY);
  if (accessToken && authenticatedUser) {
    try {
      const user = JSON.parse(authenticatedUser) as LoginUser;
      const displayName = user.username || "Usuario";
      return { id: user.userId, name: displayName, initials: displayName.slice(0, 2).toUpperCase(), email: displayName, role: "admin" };
    } catch {
      clearSession();
      return null;
    }
  }
  const stored = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function canAccessModule(user: AuthUser, module: SystemModule) {
  return ROLE_MODULES[user.role].includes(module);
}

export function getModuleForPath(pathname: string): SystemModule {
  if (pathname.startsWith("/dashboard/Inversionista/vehiculos")) return "vehiculos";
  if (pathname.startsWith("/dashboard/seguros")) return "seguros";
  if (pathname.startsWith("/dashboard/Inversionista")) return "inversionistas";
  if (pathname.startsWith("/dashboard/planilla")) return "planilla";
  return "dashboard";
}

export function getFirstAllowedRoute(user: AuthUser): string | null {
  const routes: Array<[SystemModule, string]> = [
    ["dashboard", "/dashboard"],
    ["planilla", "/dashboard/planilla"],
    ["inversionistas", "/dashboard/Inversionista"],
    ["vehiculos", "/dashboard/Inversionista/vehiculos"],
    ["seguros", "/dashboard/seguros"],
  ];
  return routes.find(([module]) => canAccessModule(user, module))?.[1] ?? null;
}
