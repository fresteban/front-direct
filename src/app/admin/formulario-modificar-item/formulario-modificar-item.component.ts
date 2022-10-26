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
    detalle: '',
    precio: 0,
    categoria: '',
    subcategoria: '',
    foto: '',
    estado: ''
  }

  constructor(private ItemService: ItemService, private fb: FormBuilder, private router: Router, private _itemService: ItemService, private toastr: ToastrService) {
    this.itemForm = this.fb.group({
      nombre: [''],
      detalle: [''],
      precio: [''],
      categoria: [''],
      subcategoria: [''],
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
      detalle: this.itemForm.get('detalle')?.value,
      precio: this.itemForm.get('precio')?.value,
      categoria: this.itemForm.get('categoria')?.value,
      subcategoria: '',
      foto: this.itemForm.get('foto')?.value,
      estado: 'no disponible'
    }
  }

}
