import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../interfaces/item';
import { ItemServiceService } from '../services/item-service.service';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit {

  @Input()
  newItem: Item = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    tipo: '',
    foto: '',
    disponibilidad: false
  }

  get foodList() {
    return this.ItemServiceService.foodList;
  }

  get drinkList() {
    return this.ItemServiceService.drinkList;
  }


  constructor(private ItemServiceService: ItemServiceService) { }

  ngOnInit(): void {
  }

  addItem(){
    if(this.newItem.nombre.trim().length === 0){
      return;
    }

    if(this.newItem.tipo === '1'){
      this.ItemServiceService.addFood(this.newItem);
      this.newItem = {
        id: 0,
        nombre: '',
        descripcion: '',
        precio: 0,
        tipo: '',
        foto: '',
        disponibilidad: false
      };
    }
    else if(this.newItem.tipo === '0'){
      this.ItemServiceService.addDrink(this.newItem);
      this.newItem = {
        id: 0,
        nombre: '',
        descripcion: '',
        precio: 0,
        tipo: '',
        foto: '',
        disponibilidad: false
      };
    }
  }
}
