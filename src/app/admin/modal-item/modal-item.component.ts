import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/interfaces/item';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../interfaces/categoria';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent implements OnInit {
  subcategorias = [];
  cat: Categoria[] = [];
  itemForm: FormGroup;
  title = '';
  subCategoriaSelect = '';
  categoriaSelect = '';
  id_: any = '';

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
    private _categoriaService: CategoriasService,
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
  //Función cargarCategorias() carga las categorias existentes
  cargarCategorias() {
    this._categoriaService.obtenerCategoriasTotal().subscribe(data => {
      this.cat = data;
      this.categoriaSelect = this.cat[0].categoria;
      this.changeCategoria(this.categoriaSelect);
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  errormessage = '';
  errorclass = '';
  saveresponse: any;
  editdata: any = '';

  changeCategoria(it) {
    let found = this.cat.find(categoria => categoria.categoria == it);
    if (found.categoria == this.id_.categoria) {
      this.subCategoriaSelect = this.id_.subcategoria;
      this.subcategorias = found.subcategoria.filter(subc => subc != this.id_.subcategoria);
    }
    else {
      this.subCategoriaSelect = found.subcategoria[0];
      this.subcategorias = found.subcategoria.filter(subc => subc != this.subCategoriaSelect);
    }
  }

// Función guardarItem() permite guardar un nuevo item 
  guardarItem() {
    let estado;
    if (this.id_) {
      estado = this.id_.estado;
    }
    else {
      estado = 'no disponible'
    }
    if (this.itemForm.valid) {
      const newItem: Item = {
        nombre: this.itemForm.get('nombre')?.value,
        detalle: this.itemForm.get('detalle')?.value,
        precio: this.itemForm.get('precio')?.value,
        categoria: this.itemForm.get('categoria')?.value,
        subcategoria: this.itemForm.get('subcategoria')?.value,
        estado: estado,
        foto: ''
      }

      if (this.editdata) {
        this._itemService.actualizarItem(newItem, this.editdata._id).subscribe(data => {
        });
        this.close()
      }
      else {
        this._itemService.guardarItem(newItem).subscribe(data => {
          this.errormessage = '';
          this.errorclass = ''
          this.toastr.success('Agregado con exito');
          this.close()
        }, error => {
          console.log(error);
          this.itemForm.reset();
        });
      }

    } else {
      this.errormessage = 'Ingese datos validos';
      this.errorclass = 'errormessage';
    }
  }

//Función cargarItemEditar() permite cargar los datos de los items existentes
  cargarItemEditar(id: any) {
    this.open(id);
    this.cargarCategorias()
    this._itemService.obtenerItem(id).subscribe(res => {
      this.id_ = res;
      this.editdata = res;
      this.changeCategoria(this.editdata.categoria)
      this.subCategoriaSelect = this.editdata.subcategoria;
      const indexItem = this.subcategorias.findIndex((item) => {
        return item === this.subCategoriaSelect;
      });
      if (indexItem !== -1) {
        this.subcategorias.splice(indexItem, 1);
      }
      if (!this.editdata.detalle) {
        this.editdata.detalle = '';
      }

      this.itemForm.setValue({
        nombre: this.editdata.nombre,
        detalle: this.editdata.detalle,
        precio: this.editdata.precio,
        categoria: this.editdata.categoria,
        subcategoria: this.editdata.subcategoria
      });
    })
  }

//Función cargarCategoriaEditar() permite cargar las categorias de los items existentes
  cargarCategoriaEditar(id: any) {
    this.open(id);
    this.cargarCategorias()
    this._categoriaService.obtenerCategorias().subscribe(res => {
      this.id_ = res;
      this.editdata = res;
      this.changeCategoria(this.editdata.categoria)
      this.subCategoriaSelect = this.editdata.subcategoria;
      const indexItem = this.subcategorias.findIndex((item) => {
        return item === this.subCategoriaSelect;
      });
      if (indexItem !== -1) {
        this.subcategorias.splice(indexItem, 1);
      }

      this.itemForm.setValue({
        categoria: this.editdata.categoria,
        subcategoria: this.editdata.subcategoria
      });
    })
  }

//Función limpiarFormulario() permite limpiar el formulario una vez que se cierra el formulario y se abre nuevamente
  limpiarFormulario() {
    this.itemForm.setValue({
      nombre: '',
      detalle: '',
      precio: '',
      categoria: this.categoriaSelect,
      subcategoria: this.subCategoriaSelect,
    });
    this.editdata = ''
  }

// Función open() permite abrir el modal que contiene el formulario 
  open(id: any) {
    this.cargarCategorias();
    this.errormessage = '';
    this.errorclass = '';
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

//Función close() permite cerrar el modal que contiene el formulario
  close() {
    this.modalService.dismissAll()
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
