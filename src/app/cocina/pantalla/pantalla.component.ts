import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { ItemService } from '../../services/item.service';
import { Pedido } from 'src/app/interfaces/pedido';

@Component({
  selector: 'app-pantalla',
  templateUrl: './pantalla.component.html',
  styleUrls: ['./pantalla.component.scss']
})
export class PantallaComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private _pedidoService: PedidoService, private _itemServie: ItemService) { }

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this._pedidoService.obtenerPedidos().subscribe(data => {
      data.forEach(element => {
        this.pedidos.push(element);
      });
      console.log(this.pedidos)
    }, error => {
      console.log(error);
    })

  }

}
