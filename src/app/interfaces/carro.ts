import { Item } from "./item";

export class Carro {
  id_?: string;
  mesa: number
  carroItems: Item[];
  estado: string;
  f_creacion: Date;
  metodo_pago: string;
  total: number;
  // Configurar el link de mesa
  // mesa: number;

  constructor(mesa: number, carroItems:Item[], estado: string,
    f_creacion:Date, metodo_pago: string, total: number){

    this.mesa = mesa;
    this.carroItems = carroItems;
    this.estado = estado;
    this.f_creacion = f_creacion;
    this.metodo_pago = metodo_pago;
    this.total = total;
  }
}
