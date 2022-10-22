import { Cesta } from "./carro";

export interface Pedido {
  id_: number;
  listaCesta: Cesta[];
  totalPedido: number;
  mesa: number;
}
