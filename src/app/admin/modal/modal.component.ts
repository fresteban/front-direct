import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bootstrapApplication} from '@angular/platform-browser';
import { Item } from '../interfaces/item';
import { ItemTableComponent } from '../item-table/item-table.component';
import { ItemServiceService } from '../services/item-service.service';


declare var window:any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  title = 'ang13-bootstrap5-modal-demo';
  formModal: any;
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

  constructor(private ItemServiceService: ItemServiceService, public fb: FormBuilder) {
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
