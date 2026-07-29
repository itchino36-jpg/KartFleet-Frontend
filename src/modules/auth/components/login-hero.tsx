import Image from "next/image";
import { BRAND, LOGIN_HERO_COPY } from "@/constants/brand.constants";

export function LoginHero() {
  return (
    <div className="relative hidden flex-col overflow-hidden bg-white px-10 py-9 text-neutral-900 md:flex md:w-1/2">
      {/* Marca de agua "K" — decorativa, casi imperceptible */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-10 select-none text-[420px] font-black italic leading-none tracking-tighter text-black/[0.035]"
      >
        K
      </span>

      {/* Logo */}
      <div className="relative z-10 flex items-end gap-2">
        <Image
          src={BRAND.logoSrc}
          width={240}
          height={120}
          priority
          className="h-80 w-auto object-contain object-left"
          alt={""}
        />
      </div>

      {/* Copy central — empujado hacia el tercio inferior, como el mockup */}
      <div className="relative z-10 mx-auto mt-8 flex max-w-[24rem] flex-col items-center text-center">
        <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-neutral-600/70">
          {LOGIN_HERO_COPY.eyebrow}
        </p>
        <h1 className="text-[4.2rem] font-bold leading-[1.0] tracking-tight text-neutral-900">
          {LOGIN_HERO_COPY.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-600/80">
          {LOGIN_HERO_COPY.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center self-start gap-2 pt-8 text-[12px] text-neutral-500/80">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-900/40" />
        {LOGIN_HERO_COPY.footer}
      </div>
    </div>
  );
}
