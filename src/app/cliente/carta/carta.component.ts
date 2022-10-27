import { Categoria } from '../../interfaces/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/interfaces/item';
import { CarroService } from 'src/app/services/carro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {
  subcategorias: string[] = [];
  listaItems: Item[] = [];
  categorias: string[] = ['Comida', 'Bebestible'];
  cat: Categoria[] = [];

  constructor(private _itemService: ItemService, private _carroService: CarroService, private _categoriaService: CategoriasService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerItems();
    this.cargarSubCategorias();
    this.cargarCategorias();
  }

  cargarCategorias() {
    this._categoriaService.obtenerCategorias().subscribe(data => {
      console.log("data:; ", data);
      this.cat = data;
      console.log("this.cat: ", this.cat);
    })
  }

  cargarSubCategorias() {
    this._itemService.obtenerSubCategorias().subscribe(data => {
      console.log("data: ", data);
      this.subcategorias = data;
    })
  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      console.log(data);
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }

  agregarCarro(item: any) {
    var cantidad: number = +(<HTMLInputElement>document.getElementById('cantidad')).value;
    for (let index = 0; index < cantidad; index++) {
      this._carroService.agregarCarro(item);
    }
    this.toastr.success('Item agregado a la cesta')
  }
}
