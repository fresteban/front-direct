import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/interfaces/item';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent implements OnInit {
  categorias: String[] = ['Comida', 'Bebestible'];
  subcategorias: String[] = [];
  itemForm: FormGroup;
  title = '';

  @Input()
  newItem: Item = {
    nombre: '',
    detalle: '',
    precio: 0,
    categoria: '',
    subcategoria: '',
    estado: 'no disponible',
    foto: ''
  }

  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private _itemService: ItemService,
    private toastr: ToastrService) {
    this.itemForm = this.fb.group({
      nombre: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      subcategoria: ['', [Validators.required]],
    })
  }

  @ViewChild('content') addview!: ElementRef

  ngOnInit(): void {
    this.cargarSubCategorias();
  }

  cargarSubCategorias() {
    this._itemService.obtenerSubCategorias().subscribe(data => {
      this.subcategorias = data;
    })
  }

  errormessage = '';
  errorclass = '';
  saveresponse: any;
  editdata: any;

  guardarItem() {

    if (this.itemForm.valid) {
      const newItem: Item = {
        nombre: this.itemForm.get('nombre')?.value,
        detalle: this.itemForm.get('detalle')?.value,
        precio: this.itemForm.get('precio')?.value,
        categoria: this.itemForm.get('categoria')?.value,
        subcategoria: this.itemForm.get('subcategoria')?.value,
        estado: 'no disponible',
        foto: ''
      }
      console.log("newItem: ", newItem)

      if (this.editdata) {
        console.log(this.editdata._id)
        //values = this.itemForm.getRawValue()
        this._itemService.actualizarItem(this.itemForm.getRawValue()).subscribe(data => {
          console.log(this.saveresponse);
          console.log("EDIT");
        });
      }
      else {
        this._itemService.guardarItem(this.itemForm.getRawValue()).subscribe(data => {
          this.saveresponse = data;
          console.log(this.saveresponse);
          console.log("NEW");


        });
      }

    } else {
      this.errormessage = 'Ingese datos validos';
      this.errorclass = 'errormessage';
    }
  }

  cargarItemEditar(id: any) {
    this.open(id);
    this._itemService.obtenerItem(id).subscribe(res => {
      this.editdata = res;
      this.itemForm.setValue({
        nombre: this.editdata.nombre,
        detalle: this.editdata.detalle,
        precio: this.editdata.precio,
        categoria: this.editdata.categoria,
        subcategoria: this.editdata.subcategoria
      });
    })

  }

  limpiarFormulario() {
    this.itemForm.setValue({
      nombre: '',
      detalle: '',
      precio: '',
      categoria: '',
      subcategoria: '',
    });
  }

  open(id: any) {
    if (id == '') {
      this.title = "Agregar nuevo Item";
    } else {
      this.title = "Editar Item";
    }
    this.itemForm.reset();
    this.limpiarFormulario();
    this.modalService.open(this.addview, { ariaLabelledBy: 'formulario-item' }).result.then((result) => {
    }, (reason) => {

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing esc';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by click on a backdrop';
    } else {
      return `with ${reason}`;
    }
  }

}
