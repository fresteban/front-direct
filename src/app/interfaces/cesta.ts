import { ItemPedido } from "./item-pedido";

export interface Cesta {
  id_: number;
  activo: boolean;
  fechaInicio: Date;
  estado: string;
  listaItems: ItemPedido;
  totalCesta: number;
  mesa: number;
}
