interface InversionistaStepIndicatorProps {
  paso: 1 | 2;
}

export function InversionistaStepIndicator({
  paso,
}: InversionistaStepIndicatorProps) {
  return (
    <div
      className="mx-auto flex w-full max-w-md items-center px-5 py-2"
      aria-label={`Paso ${paso} de 2`}
    >
      <div
        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300 ${
          paso === 1
            ? "border-slate-950 bg-slate-950 text-white"
            : "border-emerald-600 bg-emerald-600 text-white"
        }`}
        aria-label={paso === 1 ? "Paso 1 activo" : "Paso 1 completado"}
      >
        1
      </div>
      <div className="relative h-1 flex-1 overflow-hidden bg-slate-200">
        <div
          className={`absolute inset-y-0 left-0 bg-emerald-600 transition-all duration-500 ease-out ${
            paso === 2 ? "w-full" : "w-0"
          }`}
        />
      </div>
      <div
        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300 ${
          paso === 2
            ? "border-slate-950 bg-slate-950 text-white"
            : "border-slate-300 bg-white text-slate-400"
        }`}
        aria-label={paso === 2 ? "Paso 2 activo" : "Paso 2 pendiente"}
      >
        2
      </div>
    </div>
  );
}
