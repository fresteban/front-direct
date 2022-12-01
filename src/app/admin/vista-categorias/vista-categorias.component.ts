import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';

@Component({
  selector: 'app-vista-categorias',
  templateUrl: './vista-categorias.component.html',
  styleUrls: ['./vista-categorias.component.scss']
})
export class VistaCategoriasComponent implements OnInit {

  constructor(private _categoriaService: CategoriasService, private toastr: ToastrService) {
    this._categoriaService.Refreshrequired.subscribe(result => {
      this.obtenerCategorias();
    })
    this._categoriaService.Refreshrequired.subscribe(result => {
      this.obtenerSubCategorias();
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

//Función obtenerCategorias() permite obtener las categorias ya existentes
  obtenerCategorias() {
    this._categoriaService.obtenerCategorias().subscribe(data => {
      this.listaCategorias = data;
    }, error => {
      console.log(error);
    })
  }

//Función obtenerSubCategorias() permite obtener las Sub-categorias ya existentes
  obtenerSubCategorias() {
    this._categoriaService.obtenerSubCategorias().subscribe(data => {
      this.listaSubcategorias = data;
    }, error => {
      console.log(error);
    })
  }

//Función eliminarCategoria() permite eliminar una categoria deseada
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


}
