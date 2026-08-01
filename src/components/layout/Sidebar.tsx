import Link from "next/link";
import { IoGridOutline, IoDocumentTextOutline } from "react-icons/io5";
import { sidebarItems } from "@/constants/sidebar.constants";

const iconMap = {
  Dashboard: <IoGridOutline />,
  Planilla: <IoDocumentTextOutline />,
};

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-3xl font-bold">K@R</h1>
        <p className="text-sm text-slate-500">KarFleet</p>
      </div>

      {/* Menú */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.path}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
              >
                <span className="text-xl">{iconMap[item.title as keyof typeof iconMap]}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}