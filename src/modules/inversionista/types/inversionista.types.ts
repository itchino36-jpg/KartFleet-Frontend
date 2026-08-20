export interface Inversionista {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  correo: string;
  direccion: string;
  createdAt?: string;
}

export type InversionistaFormData = Omit<Inversionista, "id" | "createdAt">;
