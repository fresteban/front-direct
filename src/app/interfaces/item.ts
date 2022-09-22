export class Item {
  _id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tipo: string;
  foto: string;
  disponibilidad: boolean | null;

  constructor(nombre: string, descripcion: string, precio: number, tipo: string, foto: string, disponibilidad: boolean){
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.tipo = tipo;
    this.foto = foto;
    this.disponibilidad = disponibilidad;
  }


}
