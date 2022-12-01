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

//Carga los pedidos que estan en el sistema
  ngOnInit(): void {
    this.obtenerPedidos();
    this.pedidos.forEach(element => {
      console.log('comentario', element)
    });

  }

  //Permite obtener todos los pedidos realizados
  obtenerPedidos() {
    this._pedidoService.obtenerPedidos().subscribe(data => {
      data.forEach(element => {
        this.pedidos.push(element);
      });
      //console.log(this.pedidos)
      this.imprimir();
    }, error => {
      console.log(error);
    })
  }

//Permite cambiar el estado del pedido
  cambiarEstado(pedido: Pedido) {
    console.log('pedido', pedido);
    if(confirm('¿Está seguro de que el pedido está listo?')){
      this._pedidoService.cambiarEstadoPedido(pedido).subscribe(data => {

      })
    }
  imprimir(){
    console.log('this.p: ', this.pedidos);

    console.log('peido: ', this.pedidos[0].carro[0].carroItems[0].Item.nombre);
    console.log('peido: ', this.pedidos[0].carro[0].carroItems[0].Cantidad);

    this.pedidos.forEach(element => {
      console.log('elem: ', element.carro[0].carroItems)
    });
  }

}
