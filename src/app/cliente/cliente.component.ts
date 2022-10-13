import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../app/services/item.service'
import { Item } from '../../app/interfaces/item';
import { CarroService } from '../services/carro.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  listaItems: Item[] = [];

  constructor(private _itemService: ItemService, private _carroService: CarroService) { }

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

  agregarCarro(item : any) {
    this._carroService.agregarCarro(item);
    
  }

}
