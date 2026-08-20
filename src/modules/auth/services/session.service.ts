import { ROLE_MODULES } from "@/modules/auth/constants/authorization.constants";
import type {
  AuthUser,
  SystemModule,
} from "@/modules/auth/types/authorization.types";
import type { LoginUser } from "@/modules/auth/types/login.types";

export const ACCESS_TOKEN_KEY = "karfleet_access_token";
export const USER_KEY = "karfleet_user";
export const MUST_CHANGE_PASSWORD_KEY = "karfleet_must_change_password";

type TokenPayload = {
  exp?: number;
  roles?: string[];
};

function readTokenPayload(token: string): TokenPayload | null {
  try {
    const encoded = token.split(".")[1];
    if (!encoded) return null;
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const normalized = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload = decodeURIComponent(
      atob(normalized)
        .split("")
        .map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );
    return JSON.parse(payload) as TokenPayload;
  } catch {
    return null;
  }
}

function mapBackendRole(roles: string[] = []): AuthUser["role"] {
  const normalized = roles.map((role) => role.toLowerCase());
  if (normalized.some((role) => role.includes("super"))) return "superadmin";
  if (normalized.some((role) => role.includes("administrador") || role === "admin")) return "admin";
  if (normalized.some((role) => role.includes("encargado"))) return "group_manager";
  return "driver";
}

export function saveAuthenticatedSession(accessToken: string, user: LoginUser, mustChangePassword: boolean) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(MUST_CHANGE_PASSWORD_KEY, String(mustChangePassword));
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const authenticatedUser = localStorage.getItem(USER_KEY);
  if (accessToken && authenticatedUser) {
    try {
      const user = JSON.parse(authenticatedUser) as LoginUser;
      const tokenPayload = readTokenPayload(accessToken);
      if (!tokenPayload || (tokenPayload.exp && tokenPayload.exp * 1000 <= Date.now())) {
        clearSession();
        return null;
      }
      const displayName = user.username || "Usuario";
      return { id: user.userId, name: displayName, initials: displayName.slice(0, 2).toUpperCase(), email: displayName, role: mapBackendRole(tokenPayload.roles) };
    } catch {
      clearSession();
      return null;
    }
  }
  return null;
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(MUST_CHANGE_PASSWORD_KEY);
}

export function mustChangePassword() {
  return typeof window !== "undefined" && localStorage.getItem(MUST_CHANGE_PASSWORD_KEY) === "true";
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
