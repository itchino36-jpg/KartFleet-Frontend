"use client";

import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";

interface InversionistaFormData {
  nombre: string;
  documento: string;
  telefono: string;
  correo: string;
  direccion: string;
  placa: string;
  marca: string;
  modelo: string;
  anio: string;
  color: string;
  tipoVehiculo: string;
}

interface InversionistaFormProps {
  initialData?: Inversionista;
  isEditing: boolean;
  onSave: (data: InversionistaFormData) => void;
  onCancel: () => void;
}

export default function InversionistaForm({
  initialData,
  isEditing,
  onSave,
  onCancel,
}: InversionistaFormProps) {
  const [nombre, setNombre] = useState(initialData?.nombre ?? "");
  const [documento, setDocumento] = useState(
    initialData?.documento ?? ""
  );
  const [telefono, setTelefono] = useState(
    initialData?.telefono ?? ""
  );
  const [correo, setCorreo] = useState(
    initialData?.correo ?? ""
  );
  const [direccion, setDireccion] = useState(
    initialData?.direccion ?? ""
  );

  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [color, setColor] = useState("");
  const [tipoVehiculo, setTipoVehiculo] = useState("");

  const handleSubmit = () => {
    onSave({
      nombre,
      documento,
      telefono,
      correo,
      direccion,
      placa,
      marca,
      modelo,
      anio,
      color,
      tipoVehiculo,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* INFORMACIÓN DEL INVERSIONISTA */}

      <section className="rounded-xl border border-slate-200 p-5">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-950">
            Información del inversionista
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* NOMBRE */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Nombre completo
            </span>

            <input
              type="text"
              value={nombre}
              onChange={(event) =>
                setNombre(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          {/* DOCUMENTO */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Documento
            </span>

            <input
              type="text"
              value={documento}
              onChange={(event) =>
                setDocumento(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          {/* TELÉFONO */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Teléfono
            </span>

            <input
              type="tel"
              value={telefono}
              onChange={(event) =>
                setTelefono(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          {/* CORREO */}

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Correo electrónico
            </span>

            <input
              type="email"
              value={correo}
              onChange={(event) =>
                setCorreo(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>

          {/* DIRECCIÓN */}

          <label className="space-y-1.5 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              Dirección
            </span>

            <input
              type="text"
              value={direccion}
              onChange={(event) =>
                setDireccion(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
            />
          </label>
        </div>
      </section>

      {/* INFORMACIÓN DEL VEHÍCULO */}

      {!isEditing && (
        <section className="rounded-xl border border-slate-200 p-5">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-slate-950">
              Información del vehículo
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Todo inversionista nuevo debe tener un
              vehículo afiliado.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* PLACA */}

            <label className="space-y-1.5">
              <span className="text-sm font-medium text-slate-700">
                Placa
              </span>

              <input
                type="text"
                value={placa}
                onChange={(event) =>
                  setPlaca(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </label>

            {/* MARCA */}

            <label className="space-y-1.5">
              <span className="text-sm font-medium text-slate-700">
                Marca
              </span>

              <input
                type="text"
                value={marca}
                onChange={(event) =>
                  setMarca(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </label>

            {/* MODELO */}

            <label className="space-y-1.5">
              <span className="text-sm font-medium text-slate-700">
                Modelo
              </span>

              <input
                type="text"
                value={modelo}
                onChange={(event) =>
                  setModelo(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </label>

            {/* AÑO */}

            <label className="space-y-1.5">
              <span className="text-sm font-medium text-slate-700">
                Año
              </span>

              <input
                type="number"
                value={anio}
                onChange={(event) =>
                  setAnio(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </label>

            {/* COLOR */}

            <label className="space-y-1.5">
              <span className="text-sm font-medium text-slate-700">
                Color
              </span>

              <input
                type="text"
                value={color}
                onChange={(event) =>
                  setColor(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </label>

            {/* TIPO DE VEHÍCULO */}

            <label className="space-y-1.5">
              <span className="text-sm font-medium text-slate-700">
                Tipo de vehículo
              </span>

              <input
                type="text"
                value={tipoVehiculo}
                onChange={(event) =>
                  setTipoVehiculo(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </label>
          </div>
        </section>
      )}

      {/* BOTONES */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {isEditing
            ? "Guardar cambios"
            : "Guardar"}
        </button>
      </div>
    </div>
  );
}