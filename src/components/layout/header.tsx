import {
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">KarFleet</h1>
        <p className="text-sm text-slate-500">Sistema de gestión de flota</p>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
    

        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100">
          <IoNotificationsOutline className="text-xl" />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100">
          <IoSettingsOutline className="text-xl" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
            MC
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">Mario Chino</p>
            <p className="text-xs text-slate-500">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
}
