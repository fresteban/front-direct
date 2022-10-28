import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carro } from '../interfaces/carro';
import { ItemPedido } from '../interfaces/item-pedido';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  urlCarro = 'http://localhost:4000/api/Carro/';
  urlItem = 'http://localhost:4000/api/Item/';

  constructor(private http: HttpClient) { }
  //USANDO BACKEND
  crearCarro(carro: Carro): Observable<any> {
    return this.http.post(this.urlCarro, carro);
  }

  public listaCarro: Carro[] = [];
  public listaItemPedido: ItemPedido[] = [];
  public listaProductos = new BehaviorSubject<any>([]);

  obtenerProductos() {
    return this.listaProductos.asObservable();
  }
  crearProducto(producto: any) {
    this.listaCarro.push(...producto);
    this.listaProductos.next(producto);
  }
  agregarCarro(product: any) {
    this.listaCarro.push(product);
    this.listaProductos.next(this.listaCarro);
    this.obtenerPrecio();
  }
  obtenerPrecio(): number {
    let total = 0;
    this.listaCarro.map((a: any) => {
      total += a.precio;
    });
    return total;
  }
  quitarItemCarro(product: any) {
    this.listaCarro.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.listaCarro.splice(index, 1);
      }
    })
  }
  quitarTodo() {
    this.listaCarro = [];
    this.listaProductos.next(this.listaCarro);
  }
}
