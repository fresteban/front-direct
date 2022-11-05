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
  public productos: any[] = [];
  public totalfinal: number=0;
  public cookieValue:any[]=[];
  public mesaId: number;
  index: number =0;
  subi:number=0;
  constructor(private _itemService: ItemService, private _carroService: CarroService,private cookie: CookieService) { }

  ngOnInit(): void {
    //this.obtenerItems();
    this.mesaId = JSON.parse(localStorage.getItem('mesa'));
    //this._carroService.obtenerProductos()
    //  .subscribe(res => {
    //    this.productos = res;
    //    this.totalfinal = this._carroService.obtenerPrecio();
    //    console.log('original '+ this.productos)
    //  })
      if(typeof this.productos==='undefined'){
        console.log('undefined');
      }if( this.productos!){
        console.log('noexiste');
      }if( this.productos==null){
        console.log('null');
      }

      this.cookieValue = JSON.parse(localStorage.getItem('carrito'));

      for(var i = 0; i < this.cookieValue.length; i++ ){

        if(this.cookieValue[i].Cantidad >=1 && i==this.index){

          this.productos[this.subi]=this.cookieValue[i];

          this.index=i+this.cookieValue[i].Cantidad;

          this.subi++;
        }
          this.totalfinal += this.cookieValue[i].Item.precio;
          console.log(this.totalfinal)
       };

        console.log(this.productos)
  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      this.listaItems = data;
    }, error => {
      console.log(error);
    })
  }

  quitarItem(item: Item,index: number) {
    //this._carroService.quitarItemCarro(item);
    //if(this.listaItems[index])
    //this.totalfinal-=this.cookieValue[index].Item.precio;
    this.totalfinal-=this.productos[index].Item.precio;
    this.productos[index].Cantidad-=1;
    if(this.productos[index].Cantidad==0){
      this.productos.splice(index,1);
    }

    this.cookieValue.splice(index,1);
    localStorage.setItem('carrito',JSON.stringify(this.productos));


  }

}
