export class Categoria {
  _id?: string;
  categoria: string;
  subcategoria: string[];

  constructor(categora: string, subcategoria: string[]) {
    this.categoria = categora;
    this.subcategoria = subcategoria;
  }
}

