import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service'
import { Item } from '../../interfaces/item';
import { CarroService } from '../../services/carro.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  listaItems: Item[] = [];
  public listaProductos: any;
  public productos: any[] = [];
  public totalfinal: number = 0;
  public cookieValue: any[] = [];
  public mesaId: number;
  index: number = 0;
  subi: number = 0;
  siono: number;

  constructor(private _itemService: ItemService, private _carroService: CarroService, private cookie: CookieService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.mesaId = JSON.parse(localStorage.getItem('mesa'));

    this.cookieValue = JSON.parse(localStorage.getItem('carrito'));

    this.cookieValue.forEach(item => {
      this.productos.push(item)
      let precioItem = item.Item.precio * item.Cantidad
      this.totalfinal += precioItem;
    });

    if (JSON.parse(localStorage.getItem('totalCarrito')) == 0) {
      this.siono = 1;
    }
    if (JSON.parse(localStorage.getItem('totalCarrito')) != 0) {
      this.siono = 2;
    }
  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }

  quitarItem(item: any, index: number) {
    this.productos.find(itemCarrito => itemCarrito.Item._id == item.Item._id).Cantidad -= 1
    this.totalfinal -= this.productos.find(itemCarrito => itemCarrito.Item._id == item.Item._id).Item.precio;
    if (this.productos.find(itemCarrito => itemCarrito.Item._id == item.Item._id).Cantidad == 0) {
      this.productos.splice(index, 1);
    }
    this.rellenarCarro();
  }
  rellenarCarro() {
    this.cookieValue = [];
    this.cookieValue = this.productos;
    localStorage.setItem('carrito', JSON.stringify(this.productos));
    let cantidadItems = 0;
    this.productos.forEach(elemento => cantidadItems += elemento.Cantidad);
    localStorage.setItem('totalCarrito', JSON.stringify(cantidadItems));
  }
  borrarCarrito() {
    if (confirm('Esta seguro que desea pagar?')) {
      this.toastr.success('El pedido fue pagado con éxito', 'Tu pedido está en la cola');
      localStorage.setItem('carrito', JSON.stringify([]));
      localStorage.setItem('totalCarrito', JSON.stringify(0));
      history.go(-1);
    }
    else {

    }
  }
}
