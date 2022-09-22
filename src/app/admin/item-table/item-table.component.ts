import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../interfaces/item';
import { ItemServiceService } from '../services/item-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})

export class ItemTableComponent implements OnInit {

  itemForm: FormGroup;

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


  constructor(private ItemServiceService: ItemServiceService, public fb: FormBuilder) {
    this.itemForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    })
  }

  ngOnInit() {
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
      console.log('Comida agregada');
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
      console.log('Bebida agregada');
    }
    console.log('additem');
  }

}
