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
  public totalfinal: number=0;
  public cookieValue:any[]=[];
  public mesaId: number;
  index: number =0;
  subi:number=0;
  siono:number;

  constructor(private _itemService: ItemService, private _carroService: CarroService,private cookie: CookieService,private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.obtenerItems();
    this.mesaId = JSON.parse(localStorage.getItem('mesa'));
    //this._carroService.obtenerProductos()
    //  .subscribe(res => {
    //    this.productos = res;
    //    this.totalfinal = this._carroService.obtenerPrecio();
    //    console.log('original '+ this.productos)
    //  })

      this.cookieValue = JSON.parse(localStorage.getItem('carrito'));

      for(var i = 0; i < this.cookieValue.length; i++ ){

        if(this.cookieValue[i].Cantidad >=1 && i==this.index){

          this.productos[this.subi]=this.cookieValue[i];

          this.index=i+this.cookieValue[i].Cantidad;

          this.subi++;
        }
          this.totalfinal += this.cookieValue[i].Item.precio;

       };

        if(JSON.parse(localStorage.getItem('totalCarrito')) ==0){
          this.siono = 1;
        }
        if(JSON.parse(localStorage.getItem('totalCarrito')) != 0){
          this.siono = 2;
        }
        console.log('CokkieValue antes de Borrar: ', this.cookieValue)
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
    console.log(this.productos)
    this.totalfinal-=this.productos[index].Item.precio;
    this.productos[index].Cantidad-=1;

    if(this.productos[index].Cantidad==0){
      this.productos.splice(index,1);
    }
    this.rellenarCarro();

  }
  rellenarCarro(){
    this.cookieValue =[];

    var lastj: number = 0

    for(var i = 0; i < this.productos.length; i++ ){

      for(var j = 0 ; j < this.productos[i].Cantidad;j++){

        this.cookieValue[lastj+j]=this.productos[i];
        console.log(lastj+j,' ',this.cookieValue[lastj+j]);

      }
      lastj +=this.productos[i].Cantidad;

    }
    console.log('CokkieValue tras Borrar: ', this.cookieValue)

    localStorage.setItem('carrito',JSON.stringify(this.cookieValue));
    localStorage.setItem('totalCarrito',JSON.stringify(this.cookieValue.length));

  }
  borrarCarrito() {
    if (confirm('Esta seguro que desea pagar?'))
    {
      this.toastr.success('El pedido fue pagado con éxito', 'Tu pedido está en la cola');
      localStorage.setItem('carrito',JSON.stringify([]));
      localStorage.setItem('totalCarrito',JSON.stringify(0));
      history.go(-1);
    }
    else{

    }
  }
}
