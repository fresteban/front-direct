import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/interfaces/item';
import { CarroService } from 'src/app/services/carro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  listaItems: Item[] = [];

  constructor(private _itemService: ItemService, private _carroService: CarroService, private toastr: ToastrService) { }

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
    this.toastr.success('Item agregado a la cesta')
    this._carroService.agregarCarro(item);

  }

}
