import { Cesta } from "./cesta";

export interface Pedido {
  id_: number;
  listaCesta: Cesta[];
  totalPedido: number;
  mesa: number;
}
