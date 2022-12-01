import { Carro } from "./carro";

export interface Pedido {
  id_: number;
  carro: Carro;
  fecha_creacion: Date;
  estado: string;
  mesa: number;
}
