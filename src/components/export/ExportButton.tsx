import type { LucideIcon } from "lucide-react";

interface ExportButtonProps {
  label: string;
  loadingLabel: string;
  isLoading: boolean;
  icon: LucideIcon;
  onClick: () => void;
  variant: "excel" | "pdf";
}

export function ExportButton({ label, loadingLabel, isLoading, icon: Icon, onClick, variant }: ExportButtonProps) {
  const colors = variant === "excel"
    ? "border-emerald-700 bg-emerald-700 text-white hover:border-emerald-800 hover:bg-emerald-800"
    : "border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition disabled:cursor-wait disabled:opacity-60 ${colors}`}
    >
      <Icon className={`h-4 w-4 ${isLoading ? "animate-pulse" : ""}`} />
      {isLoading ? loadingLabel : label}
    </button>
  );
}
