export interface Item {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tipo: string;
  foto: string;
  disponibilidad: boolean | null;
}
