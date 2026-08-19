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

export default function PlanillaModuleSelector({items,selectedSection,onSelect,
}: Props) {
  return (
    <div className="overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white/95 p-2.5 shadow-lg shadow-slate-950/5 backdrop-blur [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin]">
      <div className="flex min-w-max items-center gap-2">
        {items.map((item) => {
          const isActive = selectedSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`inline-flex items-center rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-200 active:scale-95 ${
                isActive
                  ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                  : "border-transparent bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-950"
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
