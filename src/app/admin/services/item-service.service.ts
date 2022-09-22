import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

 
  constructor() { }

 

  private _foodList: Item[] = [{
    id: 1,
    nombre: 'Comida ejemplo',
    descripcion: 'Comida Comida Comida',
    precio: 100,
    tipo: '1',
    foto: '',
    disponibilidad: true
  }];
  private _drinkList: Item[] = [{
    id: 2,
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
