import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { ItemService } from '../../services/item.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-pantalla',
  templateUrl: './pantalla.component.html',
  styleUrls: ['./pantalla.component.scss']
})
export class PantallaComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedido: Pedido;

  constructor(private _pedidoService: PedidoService, private _itemService: ItemService) { }

  ngOnInit(): void {
    this.obtenerPedidos();
    this.pedidos.forEach(element => {
      console.log('comentario', element)
    });

  }

  obtenerPedidos() {
    this._pedidoService.obtenerPedidos().subscribe(data => {
      data.forEach(element => {
        this.pedidos.push(element);
      });
    }, error => {
      console.log(error);
    })
  }

  cambiarEstado(pedido: Pedido) {
    console.log('pedido', pedido);
    if(confirm('¿Está seguro de que el pedido está listo?')){
      this._pedidoService.cambiarEstadoPedido(pedido).subscribe(data => {

      })
    }
  }

}
