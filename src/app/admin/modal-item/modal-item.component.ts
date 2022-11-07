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
  cargarCategorias() {
    this._categoriaService.obtenerCategoriasTotal().subscribe(data => {
      console.log("data: ", data);
      this.cat = data;
      console.log("catttt: ", this.cat[0].categoria);

      this.categoriaSelect = this.cat[0].categoria;
      this.subCategoriaSelect = this.cat[0].subcategoria[0];
      console.log("subcat: " , this.subcategorias);
      this.changeCategoria(this.cat[0].categoria);
    });


  }

  ngOnInit(): void {
    console.log("ASDAD");
    this.cargarCategorias();
    console.log("cat: ", this.cat);
    //this.categoriaSelect = this.cat[0].categoria;
    //this.subCategoriaSelect = this.cat[0].subcategoria[0];
    //this.changeCategoria(this.categoriaSelect);
    //this.cargarSubCategorias();
  }

  cargarSubCategorias() {
    this._itemService.obtenerSubCategorias().subscribe(data => {
      this.subcategorias = data;
    })
  }



  errormessage = '';
  errorclass = '';
  saveresponse: any;
  editdata: any = '';

  changeCategoria(it) {
    this.cat.forEach(element => {
      if (element.categoria == it) {
        this.subcategorias = element.subcategoria
        console.log("asa: " , this.subcategorias)
      }
    });
  }

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

      if (this.editdata) {
        this._itemService.actualizarItem(newItem, this.editdata._id).subscribe(data => {
        });
      }
      else {
        this._itemService.guardarItem(newItem).subscribe(data => {
          this.toastr.success('Agregado con exito');
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

  borrarPrimerElementoSelect() {
    const indexItem = this.subcategorias.findIndex((item) => {
      return item === this.subCategoriaSelect;
    });
    if (indexItem !== -1) {
      this.subcategorias.splice(indexItem, 1);
    }
  }

  cargarItemEditar(id: any) {
    this.open(id);
    this._itemService.obtenerItem(id).subscribe(res => {
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
      categoria: this.categoriaSelect,
      subcategoria: this.subCategoriaSelect,
    });

    this.subcategorias = [];
    this.editdata = ''
  }

  open(id: any) {

    if (id == '') {
      this.title = "Agregar nuevo Item";
      this.categoriaSelect = this.cat[0].categoria;
      this.subCategoriaSelect = this.cat[0].subcategoria[0];
      this.borrarPrimerElementoSelect();
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
