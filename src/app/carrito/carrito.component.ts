import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../app/services/item.service'
import { Item } from '../../app/interfaces/item';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  listaItems: Item[] = [];

  constructor(private _itemService: ItemService) { }

  ngOnInit(): void {
    this.obtenerItems();
  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      console.log(data);
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }
}
