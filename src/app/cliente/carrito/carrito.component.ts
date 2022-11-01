import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service'
import { Item } from '../../interfaces/item';
import { CarroService } from '../../services/carro.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  listaItems: Item[] = [];
  public listaProductos: any;
  public productos: any;
  public totalfinal?: number;
  public cookieValue:any[]=[];

  constructor(private _itemService: ItemService, private _carroService: CarroService,private cookie: CookieService) { }

  ngOnInit(): void {
    this.obtenerItems();
    this._carroService.obtenerProductos()
      .subscribe(res => {
        this.productos = res;
        this.totalfinal = this._carroService.obtenerPrecio();
        console.log('original '+ this.productos)
      })

    if (typeof this.productos=='undefined' || this.productos! || this.productos==null){
      this.productos = JSON.parse(this.cookie.get('carrito'));
        console.log('cookie '+this.productos)
    }
  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }

  quitarItem(item: any) {
    this._carroService.quitarItemCarro(item);
  }

}
