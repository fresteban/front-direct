import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = 'http://localhost:4000/api/items/';
 
  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(this.url);
  }

  private _foodList: Item[] = [{
    nombre: 'Comida ejemplo',
    descripcion: 'Comida Comida Comida',
    precio: 100,
    tipo: '1',
    foto: '',
    disponibilidad: true
  }];
  private _drinkList: Item[] = [{
    nombre: 'Bebida ejemplo',
    descripcion: 'Bebida Bebida Bebida',
    precio: 200,
    tipo: '1',
    foto: '',
    disponibilidad: true
  }];

  get foodList(): Item[] {
    return [...this._foodList]
  }

  get drinkList(): Item[] {
    return [...this._drinkList]
  }

  addFood(food: Item){
    this._foodList.push(food);
  }

  addDrink(drink: Item){
    this._drinkList.push(drink);
  }
  
}
