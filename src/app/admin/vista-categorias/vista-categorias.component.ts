import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';

@Component({
  selector: 'app-vista-categorias',
  templateUrl: './vista-categorias.component.html',
  styleUrls: ['./vista-categorias.component.scss']
})
export class VistaCategoriasComponent implements OnInit {

  categoriaForm: FormGroup;
  id_: any = '';


  constructor(private fb: FormBuilder, private _categoriaService: CategoriasService, private toastr: ToastrService) {
    this._categoriaService.Refreshrequired.subscribe(result => {
      this.obtenerCategorias();
    })
    this._categoriaService.Refreshrequired.subscribe(result => {
      this.obtenerSubCategorias();
    })
    this.categoriaForm = this.fb.group({
      categoria: ['', [Validators.required]],
      subcategoria: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerSubCategorias();
    console.log(this.listaCategorias,this.listaSubcategorias)
  }

  listaCategorias: any[] = [];
  listaSubcategorias: any[] = [];
  formModal: any;

  @ViewChild(ModalItemComponent) addView !: ModalItemComponent

  obtenerCategorias() {
    this._categoriaService.obtenerCategoriasTotal().subscribe(data => {
      this.listaCategorias = data;
    }, error => {
      console.log(error);
    })
  }
  obtenerSubCategorias() {
    this._categoriaService.obtenerSubCategorias().subscribe(data => {
      this.listaSubcategorias = data;
    }, error => {
      console.log(error);
    })
  }

  crearCategoria(){
    if(this.categoriaForm.valid) {
      let categoria =  this.categoriaForm.get('categoria')?.value
      let subcategoria = this.categoriaForm.get('subcategoria')?.value
    }

    //this._categoriaService.crearCategoria(this.categoria)
  }

  eliminarCategoria(id: any) {
    if (confirm('Esta seguro de eliminar?'))
      this._categoriaService.eliminarCategoria(id).subscribe(data => {
        this.toastr.error('La categoria fue eliminada con exito', 'Categoria eliminada');
        this.obtenerCategorias();
      }, error => {
        console.log(error);
      })
  }

  editarCategoria(id: any) {
    this.addView.cargarCategoriaEditar(id);
  }

  cambiarEstado($event, categoriaid, evento){
      if (!confirm('Esta seguro?')) {
        $event.stopPropagation();
        return false;
      }
      else {
        this._categoriaService.obtenerCategorias().subscribe(res => {
          res.estado = 'eliminada';

          this._categoriaService.actualizarCategoria(res, categoriaid).subscribe(data => {
            this.toastr.success('Categoria eliminada con exito');
          }, error => {
            console.log(error);
          });
        })
        return true;
      }
      return false;
  }

  doSomething() {
    this.obtenerCategorias();
  }

  changeCategoria(it) {
    let found = this.listaCategorias.find(categoria => categoria.categoria == it);
    if (found.categoria == this.id_.categoria) {
      this.listaSubcategorias = found.subcategoria.filter(subc => subc != this.id_.subcategoria);
    }
    else {
      //this.listaSubcategorias = found.subcategoria.filter(subc => subc != this.subCategoriaSelect);
    }
  }

}
