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

  constructor(private _itemService: ItemService, private _carroService: CarroService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.mesaId = JSON.parse(localStorage.getItem('mesa'));
    let carrito = [];
    carrito = JSON.parse(localStorage.getItem('carrito'));

    carrito.forEach(item => {
      this.productos.push(item)
      let precioItem = item.Item.precio * item.Cantidad
      this.totalfinal += precioItem;
    });

    if ((JSON.parse(localStorage.getItem('totalCarrito')) == 0) || localStorage.getItem('totalCarrito') != undefined || localStorage.getItem('totalCarrito') != null){
      this.hayItems = false;
    }
    if (JSON.parse(localStorage.getItem('totalCarrito')) > 0) {
      this.hayItems = true;
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
    localStorage.setItem('carrito', JSON.stringify(this.productos));
    let cantidadItems = 0;
    this.productos.forEach(elemento => cantidadItems += elemento.Cantidad);
    localStorage.setItem('totalCarrito', JSON.stringify(cantidadItems));
  }

  borrarCarrito(estado:boolean) {
    if (confirm('Esta seguro que desea pagar?')) {

      localStorage.setItem('carrito', JSON.stringify([]));
      localStorage.setItem('totalCarrito', JSON.stringify(0));
      history.go(-1);
      let Estado: string;
      if(estado){
        Estado = 'espera'
      }else{
        Estado = 'aceptado'
      }
      let carro  = new Carro(this.mesaId, this.productos,Estado,"virtual",this.totalfinal);

      this._carroService.crearCarro(carro).subscribe(data=>{
        this.toastr.success('El pedido fue pagado con éxito', 'Tu pedido está en la cola');
        console.log(data);
      },error=>{console.log(error)});
    }
    else {

    }
  }
}
