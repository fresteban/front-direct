import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';
import { ToastrService } from 'ngx-toastr';
import { ModalItemComponent } from '../modal-item/modal-item.component';
import { CategoriasService } from '../../services/categorias.service';


declare var window: any
@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})

export class ItemTableComponent implements OnInit {
  listaItems: Item[] = [];
  formModal: any;

  constructor(private _itemService: ItemService,
    private toastr: ToastrService) {
    this._itemService.Refreshrequired.subscribe(result => {
      this.obtenerItems();
    })
  }

  @ViewChild(ModalItemComponent) addView !: ModalItemComponent

  ngOnInit(): void {
    this.obtenerItems();
  }

//Funcion obtenerItems() funcion para obtener items existentes 
  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }

//Función eliminarItem() permite eliminar un item existente
  eliminarItem(id: any) {
    if (confirm('Esta seguro de eliminar?'))
      this._itemService.eliminarItem(id).subscribe(data => {
        this.toastr.error('El producto fue eliminado con exito', 'Producto eliminado');
        this.obtenerItems();
      }, error => {
        console.log(error);
      })
  }

//Función editarItem() carga los datos del item a editar
  editarItem(id: any) {
    this.addView.cargarItemEditar(id);
  }

  doSomething() {
    this.obtenerItems();
  }

//Función cambiarEstado() permite cambiar el estado de un item
//Sugerencia: Colocar un nombre más representativo ej: cambiarEstadoItem()
  cambiarEstado($event, itemId, evento) {
    if (!confirm('Esta seguro?')) {
      $event.stopPropagation();
      return false;
    }
    else {
      if (evento == 'cambiar') {
        this._itemService.obtenerItem(itemId).subscribe(res => {
          if (res.estado == 'disponible') {
            res.estado = 'no disponible';
          }
          else if (res.estado == 'no disponible') {
            res.estado = 'disponible';
          }
          else {
            //return false;
          }
          this._itemService.actualizarItem(res, itemId).subscribe(data => {
            this.toastr.success('Estado modificado con exito');
          }, error => {
            console.log(error);
          });
        });
        return true;
      }
      else if (evento == 'eliminar') {
        this._itemService.obtenerItem(itemId).subscribe(res => {
          res.estado = 'eliminado';

          this._itemService.actualizarItem(res, itemId).subscribe(data => {
            this.toastr.success('Item eliminado con exito');
          }, error => {
            console.log(error);
          });
        });
        return true;
      }
      else {
        return false;
      }

    }
  }
}
