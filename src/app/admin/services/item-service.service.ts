import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

 
  constructor() { }

 

  private _foodList: Item[] = [{
    id: 1,
    nombre: 'Ensalada de penca',
    descripcion: 'Pico pal que lee Pico pal que lee Pico pal que lee',
    precio: 69,
    tipo: '1',
    foto: '',
    disponibilidad: true
  }];
  private _drinkList: Item[] = [{
    id: 2,
    nombre: 'Vomito de perro',
    descripcion: 'Pico pal que lee Pico pal que lee Pico pal que lee',
    precio: 666,
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
