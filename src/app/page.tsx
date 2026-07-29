import type { Metadata } from "next";
import { LoginForm } from "@/modules/auth/components/login-form";
import { LoginHero } from "@/modules/auth/components/login-hero";

export const metadata: Metadata = {
  title: "Iniciar sesión | KarFleet",
  description: "Ingresa al centro operativo de KarFleet.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-5">
      <div className="flex min-h-screen w-full overflow-hidden rounded-[1.5rem] bg-white shadow-sm md:min-h-[calc(100vh-2.5rem)]">
        <LoginHero />
        <LoginForm />
      </div>
    </main>
  );
}
