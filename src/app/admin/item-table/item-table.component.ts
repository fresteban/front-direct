import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormularioModificarItemComponent } from '../formulario-modificar-item/formulario-modificar-item.component';
import { ToastrService } from 'ngx-toastr';


declare var window:any;
@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})

export class ItemTableComponent implements OnInit {
  listaItems: Item[] = [];
  formModal: any;

  constructor(private _itemService: ItemService,
        private toastr: ToastrService) { }

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

  eliminarItem(id: any){
    this._itemService.eliminarItem(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado con exito', 'Producto eliminado');
      this.obtenerItems();
    },error => {
      console.log(error);
    })
  }

  doSomething()
  { 
     this.obtenerItems();
  }
  /*
  @Input()
  newItem: Item = {
    id: 0,
    nombre: '',
    detalle: '',
    precio: 0,
    categoria: '',
    foto: '',
    estado: false
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

    if(this.newItem.categoria === '1'){
      this.ItemService.addFood(this.newItem);
      this.newItem = {
        id: 0,
        nombre: '',
        detalle: '',
        precio: 0,
        categoria: '',
        foto: '',
        estado: false
      };
      console.log('Comida agregada');
    }
    else if(this.newItem.categoria === '0'){
      this.ItemService.addDrink(this.newItem);
      this.newItem = {
        id: 0,
        nombre: '',
        detalle: '',
        precio: 0,
        categoria: '',
        foto: '',
        estado: false
      };
      console.log('Bebida agregada');
    }
    console.log('additem');
  }

  */

}
