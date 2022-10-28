import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service'
import { Item } from '../../interfaces/item';
import { CarroService } from '../../services/carro.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  listaItems: Item[] = [];
  public listaProductos: any;
  public productos: any;
  public totalfinal?: number;

  constructor(private _itemService: ItemService, private _carroService: CarroService) { }

  ngOnInit(): void {
    this.obtenerItems();
    this._carroService.obtenerProductos()
      .subscribe(res => {
        this.productos = res;
        this.totalfinal = this._carroService.obtenerPrecio();
      })
  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }

  quitarItem(item: any) {
    this._carroService.quitarItemCarro(item);
  }

}
