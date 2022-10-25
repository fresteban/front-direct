import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';
import { ToastrService } from 'ngx-toastr';
import { ModalItemComponent } from '../modal-item/modal-item.component';


declare var window: any;
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

  @ViewChild(ModalItemComponent) addView !:ModalItemComponent

  ngOnInit(): void {
    this.obtenerItems();
  }


  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      console.log(data);
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarItem(id: any) {
    if (confirm('Esta seguro de eliminar?'))
      this._itemService.eliminarItem(id).subscribe(data => {
        this.toastr.error('El producto fue eliminado con exito', 'Producto eliminado');
        this.obtenerItems();
      }, error => {
        console.log(error);
      })
  }

  editarItem(id: any) {
    this.addView.cargarItemEditar(id);
  }

  doSomething() {
    this.obtenerItems();
  }


}
