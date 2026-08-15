import type { UseFormRegisterReturn } from "react-hook-form";

type TimeFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
};

export default function TimeField({
  label,
  registration,
  error,
  disabled,
}: TimeFieldProps) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[13px] font-medium text-slate-600">
        {label}
      </span>

      <input
        type="time"
        step="60"
        {...registration}
        disabled={disabled}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[15px]"
      />

      {error && (
        <p className="text-xs font-medium text-rose-600">
          {error}
        </p>
      )}
    </label>
  );
}
