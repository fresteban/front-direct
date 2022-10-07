import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormularioModificarItemComponent } from '../formulario-modificar-item/formulario-modificar-item.component';


declare var window:any;
@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})

export class ItemTableComponent implements OnInit {
  listaItems: Item[] = [];
  formModal: any;

  constructor(private _itemService: ItemService) { }

  ngOnInit(): void {
    this.obtenerItems();

  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      console.log(data);
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }

  /*
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
    return this.ItemService.foodList;
  }

  get drinkList() {
    return this.ItemService.drinkList;
  }


  constructor(private ItemService: ItemService, public fb: FormBuilder) {

  }

  ngOnInit() {
  }



  addItem(){
    if(this.newItem.nombre.trim().length === 0){
      return;
    }

    if(this.newItem.tipo === '1'){
      this.ItemService.addFood(this.newItem);
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
      this.ItemService.addDrink(this.newItem);
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

  */

}
