import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bootstrapApplication} from '@angular/platform-browser';
import { Item } from '../../interfaces/item';
import { ItemTableComponent } from '../item-table/item-table.component';
import { ItemService } from '../../services/item.service';


declare var window:any;

@Component({
  selector: 'app-formularioAgregarItem',
  templateUrl: './formularioAgregarItem.component.html',
  styleUrls: ['./formularioAgregarItem.component.scss']
})
export class FormularioAgregarItemComponent implements OnInit {

  title = 'ang13-bootstrap5-formularioAgregarItem-demo';
  formModal: any;
  itemForm: FormGroup;

  @Input()
  newItem: Item = {
    nombre: '',
    descripcion: '',
    precio: 0,
    tipo: '',
    foto: '',
    disponibilidad: false
  }

  constructor(private ItemService: ItemService, public fb: FormBuilder) {
    this.itemForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }


  openModal(){
    this.formModal.show();
  }
  save(){
    this.formModal.hide();
  }

  addItem(){
    if(this.newItem.nombre.trim().length === 0){
      return;
    }

    if(this.newItem.tipo === '1'){
      this.ItemService.addFood(this.newItem);
      this.newItem = {
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
