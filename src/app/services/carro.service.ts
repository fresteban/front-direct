import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  public listaCarro : any = []
  public listaProductos = new BehaviorSubject<any>([]);

  constructor() { }

  obtenerProductos(){
    return this.listaProductos.asObservable();
  }
  crearProducto(producto :any){
    this.listaCarro.push(...producto);
    this.listaProductos.next(producto);
  }
  agregarCarro(product : any){
    this.listaCarro.push(product);
    this.listaProductos.next(this.listaCarro);
    this.obtenerPrecio();
    console.log(this.listaCarro);
  }
  obtenerPrecio() : number{
    let total = 0;
    this.listaCarro.map((a:any)=>{
      total += a.precio;
    });
    return total;
  }
  quitarItemCarro(product : any){
    this.listaCarro.map((a:any, index:any)=>{
      if(product.id===a.id){
        this.listaCarro.splice(index,1);
      }
    })
  }
  quitarTodo(){
    this.listaCarro = [];
    this.listaProductos.next(this.listaCarro);
  }
}
