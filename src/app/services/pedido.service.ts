import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../interfaces/pedido';
import { Observable } from 'rxjs';
import { Carro } from '../interfaces/carro';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  urlCarro = 'https://la-mexicana-app.herokuapp.com/api/carro/';
  urlPedido = 'https://la-mexicana-app.herokuapp.com/api/pedido/';

  constructor(private http: HttpClient) {}

  crearPedido(carro: Carro): Observable<any> {
    console.log('carro: ', carro);

    return this.http.post(this.urlPedido, carro);
  }

}
