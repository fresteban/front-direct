import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/interfaces/item';




declare var window:any;

@Component({
  selector: 'app-formulario-modificar-item',
  templateUrl: './formulario-modificar-item.component.html',
  styleUrls: ['./formulario-modificar-item.component.scss']
})
export class FormularioModificarItemComponent implements OnInit {

  formModal: any;
  itemForm: FormGroup;

  @Input()
  editItem: Item = {
    nombre: '',
    descripcion: '',
    precio: 0,
    tipo: '',
    foto: '',
    disponibilidad: false
  }

  constructor(private ItemService: ItemService, private fb: FormBuilder, private router: Router, private _itemService: ItemService, private toastr: ToastrService) {
    this.itemForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      precio: [''],
      tipo: [''],
      imagen: ['']
    })
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("modalEditar")
    );
  }

  openModal(){
    this.formModal.show();
  }

  closeModal(){
    this.formModal.hide();
  }

  modificarItem(item : Item){
    const newItem: Item = {
      nombre: this.itemForm.get('nombre')?.value,
      descripcion: this.itemForm.get('descripcion')?.value,
      precio: this.itemForm.get('precio')?.value,
      tipo: this.itemForm.get('tipo')?.value,
      foto: this.itemForm.get('foto')?.value,
      disponibilidad: false
    }
  }

}
