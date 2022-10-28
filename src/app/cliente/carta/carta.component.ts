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
  listaItems: any[] = [];
  cat: Categoria[] = [];

  constructor(private _itemService: ItemService, private _carroService: CarroService, private _categoriaService: CategoriasService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerItems();
    this.cargarSubCategorias();
    this.cargarCategorias();
  }

  cargarCategorias() {
    this._categoriaService.obtenerCategorias().subscribe(data => {
      this.cat = data;
    })
  }

  cargarSubCategorias() {
    this._itemService.obtenerSubCategorias().subscribe(data => {
      this.subcategorias = data;
    })
  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      data.forEach(element => {
        var feed = { Item: element, Cantidad: 1 }
        this.listaItems.push(feed);
      });
      this.listaItems.forEach(element => {
        //console.log("item: ", element.Item._id)
      });
    }, error => {
      console.log(error);
    })
  }

  agregarCarro(item: any) {
    for (let index = 0; index < item.Cantidad; index++) {
      this._carroService.agregarCarro(item.Item);
    }
    this.toastr.success('Item agregado a la cesta')
  }

  suma(item: any) {
    this.listaItems.forEach(element => {
      if (element.Item._id == item.Item._id) {
        element.Cantidad++;
      }
    });
  }

  resta(item: any) {
    this.listaItems.forEach(element => {
      if (element.Item._id == item.Item._id) {
        if (element.Cantidad == 1) { }
        else {
          element.Cantidad--;
        }
      }
    });
  }
}
