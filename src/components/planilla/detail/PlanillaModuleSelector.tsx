type ModuleItem = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  items: ModuleItem[];
  selectedSection: string;
  onSelect: (id: string) => void;
};

export default function PlanillaModuleSelector({
  items,
  selectedSection,
  onSelect,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex min-w-max items-center gap-2">
        {items.map((item) => {
          const isActive = selectedSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-950 hover:bg-white"
              }`}
            >
              <span className="text-[11px] uppercase tracking-[0.22em] opacity-80">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}