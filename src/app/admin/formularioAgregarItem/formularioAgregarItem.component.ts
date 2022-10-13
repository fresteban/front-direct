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

  @Input()
  newItem: Item = {
    nombre: '',
    descripcion: '',
    precio: 0,
    tipo: '',
    foto: '',
    disponibilidad: false
  }

  constructor(private ItemService: ItemService, private fb: FormBuilder, private router: Router, private _itemService: ItemService, private toastr: ToastrService) {
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

  agregarItem() {
    console.log("yapo");
    const newItem: Item = {
      nombre: this.itemForm.get('nombre')?.value,
      descripcion: this.itemForm.get('descripcion')?.value,
      precio: this.itemForm.get('precio')?.value,
      tipo: this.itemForm.get('tipo')?.value,
      foto: this.itemForm.get('foto')?.value,
      disponibilidad: false
    }

    console.log(newItem);

    this._itemService.guardarItem(newItem).subscribe(data => {
      this.toastr.success('Agregado con exito');
    }, error => {
      console.log(error);
      this.itemForm.reset();
    })
    this.newItemEvent.emit("guardado");
    //this.router.navigateByUrl('/admin', { skipLocationChange: false }).then(() => this.router.navigate(["/admin"]));

  }

  inicio(){
    this.itemForm.reset();
  }

  openModal() {
    this.formModal.show();
  }
  save() {
    this.formModal.hide();
  }

  addItem() {
    if (this.newItem.nombre.trim().length === 0) {
      return;
    }

    if (this.newItem.tipo === '1') {
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
    else if (this.newItem.tipo === '0') {
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
