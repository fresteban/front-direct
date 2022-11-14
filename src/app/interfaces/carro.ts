import { Item } from "./item";

export class Carro {
  id_?: string;
  mesa: number
  carroItems: Item[];
  estado: string;
  metodo_pago: string;
  total: number;
  // Configurar el link de mesa
  // mesa: number;

  constructor(mesa: number, carroItems:Item[], estado: string, metodo_pago: string, total: number){

    this.mesa = mesa;
    this.carroItems = carroItems;
    this.estado = estado;
    this.metodo_pago = metodo_pago;
    this.total = total;
  }
}
