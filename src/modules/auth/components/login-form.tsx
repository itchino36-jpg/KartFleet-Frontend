"use client";

import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useLoginForm } from "../hooks/use-login-form";

export function LoginForm() {
  const {
    values,
    errors,
    formError,
    showPassword,
    isSubmitting,
    handleChange,
    toggleShowPassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="flex w-full flex-col justify-center bg-slate-950 px-10 py-12 text-white md:w-1/2 lg:px-28">
      <div className="mx-auto w-full max-w-md">
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-white/60">
          ACCESO SEGURO
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-white">
          Iniciar sesión
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Ingresa tus datos para entrar al centro operativo.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          {formError && (
            <div
              role="alert"
              className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
            >
              {formError}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-white/90"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="tu@empresa.com"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              className="w-full rounded-lg border border-white/10 bg-[#201c19] px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus:ring-1 focus:ring-white/40"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-300">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-white/90"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                aria-invalid={Boolean(errors.password)}
                className="w-full rounded-lg border border-white/10 bg-[#201c19] px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus:ring-1 focus:ring-white/40"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-300">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/70">
              <input
                type="checkbox"
                checked={values.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-[#201c19] text-white focus:ring-white/40"
              />
              Recordarme
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn size={16} />
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/15" />
          <span className="h-px flex-1 bg-white/15" />
        </div>

        <p className="mt-8 text-center text-sm text-white/70">
          ¿Necesitas ayuda?
          <Link
            href="/contact-admin"
            className="font-medium text-white underline underline-offset-2 hover:text-white/80"
          >
            Contacta al administrador
          </Link>
        </p>
      </div>
    </div>
  );
}
