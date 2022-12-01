import { PedidoService } from './../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service'
import { Item } from '../../interfaces/item';
import { CarroService } from '../../services/carro.service';
import { ToastrService } from 'ngx-toastr';
import { Carro } from 'src/app/interfaces/carro';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  listaItems: Item[] = [];
  public productos: any[] = [];
  public totalfinal: number = 0;
  public mesaId: number;
  index: number = 0;
  hayItems = false;

  constructor(private _itemService: ItemService,
              private _carroService: CarroService,
              private toastr: ToastrService,
              private _pedidoService: PedidoService) { }

  ngOnInit(): void {
    // se cargan el numero de mesa y carrito
    this.mesaId = JSON.parse(localStorage.getItem('mesa'));
    let carrito = [];
    carrito = JSON.parse(localStorage.getItem('carrito'));

    carrito.forEach(item => {
      this.productos.push(item)
      let precioItem = item.Item.precio * item.Cantidad
      this.totalfinal += precioItem;
    });

    if ((JSON.parse(localStorage.getItem('totalCarrito')) == 0) || localStorage.getItem('totalCarrito') != undefined || localStorage.getItem('totalCarrito') != null) {
      this.hayItems = false;
    }
    if (JSON.parse(localStorage.getItem('totalCarrito')) > 0) {
      this.hayItems = true;
    }
  }

//Funcion obtenerItems() funcion para obtener items existentes 
  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }

  //Función quitarItem() eliminar items del carro
  quitarItem(item: any, index: number) {
    this.productos.find(itemCarrito => itemCarrito.Item._id == item.Item._id).Cantidad -= 1
    this.totalfinal -= this.productos.find(itemCarrito => itemCarrito.Item._id == item.Item._id).Item.precio;
    if (this.productos.find(itemCarrito => itemCarrito.Item._id == item.Item._id).Cantidad == 0) {
      this.productos.splice(index, 1);
    }
    this.rellenarCarro();
  }

//Función rellenarCarro() llena con los items seleccionados el carro
  rellenarCarro() {
    localStorage.setItem('carrito', JSON.stringify(this.productos));
    let cantidadItems = 0;
    this.productos.forEach(elemento => cantidadItems += elemento.Cantidad);
    localStorage.setItem('totalCarrito', JSON.stringify(cantidadItems));
  }

//Funcion pagoVirtual() permite hacer pagos con tarjeta
  pagoVirtual() {
    if (confirm('Esta seguro que desea pagar?')) {
      let Estado = 'aceptado';
      let metodo_pago = 'virual'
      localStorage.setItem('carrito', JSON.stringify([]));
      localStorage.setItem('totalCarrito', JSON.stringify(0));
      history.go(-1);

      let carro = new Carro(this.mesaId, this.productos, Estado, metodo_pago, this.totalfinal);

      this._pedidoService.crearPedido(carro).subscribe(data => {
        this.toastr.success('El pedido fue pagado con éxito', 'Tu pedido está en la cola');
      },
      error => {
        console.log(error)
      });

      // this._carroService.crearCarro(carro).subscribe(data=>{
      //   this.toastr.success('El pedido fue pagado con éxito', 'Tu pedido está en la cola');
      //   console.log(data);
      // },error=>{console.log(error)});
    }
    else {

    }
  }

//Función pagoFisico() permite hacer pagos de forma fisica
  pagoFisico() {
    if (confirm('Esta seguro que desea pagar?')) {
      let metodo_pago = 'fisico'
      let Estado = 'espera'
      localStorage.setItem('carrito', JSON.stringify([]));
      localStorage.setItem('totalCarrito', JSON.stringify(0));
      history.go(-1);
      let carro = new Carro(this.mesaId, this.productos, Estado, metodo_pago, this.totalfinal);
      this._carroService.crearCarro(carro).subscribe(data=>{
        this.toastr.success('El pedido fue generado', 'Vendrá un mesero a realizar el pago');
        console.log(data);
      },error=>{console.log(error)});
    }

  }
}
