"use client";

import { Toaster } from "sonner";

export default function Sonner() {
  return (
    <Toaster
      position="top-right"
      closeButton
      expand={false}
      toastOptions={{
        duration: 3000,

        classNames: {
          toast:
            "rounded-2xl border shadow-xl backdrop-blur-md",

          success:
            "border-emerald-200 bg-white/90 text-slate-900",

          error:
            "border-rose-200 bg-rose-50/90 text-rose-900",

          loading:
            "border-slate-200 bg-white/90 text-slate-900",

          title:
            "text-sm font-semibold",

          description:
            "text-sm text-slate-500",

          closeButton:
            "border-slate-200 bg-white text-slate-500 hover:bg-slate-50",
        },
      }}
    />
  );
}