import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { Item } from '../../interfaces/item';
import { ItemTableComponent } from '../item-table/item-table.component';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


declare var window: any;

@Component({
  selector: 'app-formularioAgregarItem',
  templateUrl: './formularioAgregarItem.component.html',
  styleUrls: ['./formularioAgregarItem.component.scss']
})
export class FormularioAgregarItemComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  formModal: any;
  itemForm: FormGroup;
  categorias: String[] = ['Comida', 'Bebestible'];
  subcategorias: String[] = [];

  @Input()
  newItem: Item = {
    nombre: '',
    detalle: '',
    precio: 0,
    categoria: '',
    subcategoria: '',
    foto: '',
    estado: 'no disponible'
  }

  constructor(private fb: FormBuilder, private router: Router, private _itemService: ItemService, private toastr: ToastrService) {
    this.itemForm = this.fb.group({
      nombre: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      subcategoria: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.cargarSubCategorias();
  }

//Función cargarSubCategorias() permite cargar las subcategorias existentes
  cargarSubCategorias() {
    this._itemService.obtenerSubCategorias().subscribe(data => {
      this.subcategorias = data;
    })
  }

//Función agregarItem() permite agregar un nuevo item al inventario  
  agregarItem() {
    const newItem: Item = {
      nombre: this.itemForm.get('nombre')?.value,
      detalle: this.itemForm.get('detalle')?.value,
      precio: this.itemForm.get('precio')?.value,
      categoria: this.itemForm.get('categoria')?.value,
      subcategoria: this.itemForm.get('subcategoria')?.value,
      foto: this.itemForm.get('foto')?.value,
      estado: 'no disponible'
    }

    this._itemService.guardarItem(newItem).subscribe(data => {
      this.toastr.success('Agregado con exito');
    }, error => {
      console.log(error);
      this.itemForm.reset();
    })
    this.newItemEvent.emit("guardado");
    //this.router.navigateByUrl('/admin', { skipLocationChange: false }).then(() => this.router.navigate(["/admin"]));

  }

  inicio() {
    this.itemForm.reset();
  }

//Función openModal() permite abrir el modal que contiene el fomulario 
  openModal() {
    this.formModal.show();
  }

//Función save() permite guardar los datos
  save() {
    this.formModal.hide();
  }
}
