import { Item } from "./item";

export interface Cesta {
  id_: number;
  activo: boolean;
  fechaInicio: Date;
  estado: string;
  listaItems: Item[];
  totalCesta: number;
  // Configurar el link de mesa
  // mesa: number;
}
