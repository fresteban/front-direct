import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../interfaces/pedido';
import { Observable } from 'rxjs';
import { Carro } from '../interfaces/carro';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  urlCarro = 'http://localhost:3000/api/carro/';
  urlPedido = 'http://localhost:3000/api/pedido/';

  constructor(private http: HttpClient) {}

  crearPedido(carro: Carro): Observable<any> {
    console.log('carro: ', carro);

    return this.http.post(this.urlPedido, carro);
  }

  obtenerPedidos(): Observable<any> {
    return this.http.get(this.urlPedido);
  }

  cambiarEstadoPedido(pedido: Pedido): Observable<any> {
    return this.http.put(this.urlPedido, pedido);
  }

}
