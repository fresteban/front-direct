export class Item {
  _id?: number;
  nombre: string;
  detalle: string;
  precio: number;
  categoria: string;
  subcategoria: string;
  foto: string;
  estado: string;

  constructor(nombre: string, detalle: string, precio: number, categoria: string, subcategoria: string, foto: string, estado: string){
    this.nombre = nombre;
    this.detalle = detalle;
    this.precio = precio;
    this.categoria = categoria;
    this.subcategoria = subcategoria;
    this.foto = foto;
    this.estado = estado;
  }
}
