import { Categoria } from '../../interfaces/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/interfaces/item';
import { CarroService } from 'src/app/services/carro.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Router} from "@angular/router"
import { Carro } from 'src/app/interfaces/carro';
import { CookieService } from 'ngx-cookie-service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {
  subcategorias: string[] = [];
  listaItems: any[] = [];
  cat: Categoria[] = [];
  codeTable: String;
  mesaId: Number;
  carro: Carro;
  public cookieValue:any[]=[];
  indexCantidad:number[]=[];
  public totalItems : number = 0;


  constructor(private _itemService: ItemService, private _carroService: CarroService, private _categoriaService: CategoriasService, private toastr: ToastrService,private route: ActivatedRoute,private router: Router,private cookie: CookieService) { }

  ngOnInit(): void {
    this.obtenerItems();
    this.cargarSubCategorias();
    this.cargarCategorias();
    this.route.params.subscribe(mesa => {this.codeTable = mesa['mesa']});
    this.decode(this.codeTable)

    localStorage.setItem('mesa',JSON.stringify(this.mesaId));
    if(localStorage.getItem('carrito') != undefined || localStorage.getItem('carrito')!=null){
      this.cookieValue = JSON.parse(localStorage.getItem('carrito'));
    }
    if(localStorage.getItem('totalCarrito') != undefined || localStorage.getItem('totalCarrito')!=null){
      this.totalItems = JSON.parse(localStorage.getItem('totalCarrito'));
    }



  }
  decode(code:String){
    switch(code){
      case 'i':
        this.mesaId=1;
        break;
      case 'iy':
        this.mesaId=2;
        break;
      case 'iyj':
        this.mesaId=3;
        break;
      case 'iw':
        this.mesaId=4;
        break;
      case 'w':
        this.mesaId=5;
        break;
      case 'wi':
        this.mesaId=6;
        break;
      case 'wii':
        this.mesaId=7;
        break;
      case 'wiii':
        this.mesaId=8;
        break;
      case 'n':
        this.mesaId=9;
        break;
      case 'x':
        this.mesaId=10;
        break;
      default:
        this.router.navigate(['/error']);
    }


  }
  maximoMesa(){
    if (this.mesaId>10 || this.mesaId==0)
    this.router.navigate(['carta'])
  }
  cargarCategorias() {
    this._categoriaService.obtenerCategorias().subscribe(data => {
      this.cat = data;
    })
  }

  cargarSubCategorias() {
    this._itemService.obtenerSubCategorias().subscribe(data => {
      this.subcategorias = data;
    })
  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      data.forEach(element => {
        var feed = { Item: element, Cantidad: 1 }
        this.listaItems.push(feed);
      });
      this.listaItems.forEach(element => {
        //console.log("item: ", element.Item._id)
      });
    }, error => {
      console.log(error);
    })
  }

  agregarCarro(item: any) {
      let index :number=0;
    for (let index = 0; index < item.Cantidad; index++) {

        //this._carroService.agregarCarro(item.Item);
        this.cookieValue.push(item);

        localStorage.setItem('carrito',JSON.stringify(this.cookieValue));

    }
    this.toastr.success('Item agregado a la cesta')
    this.totalItems += item.Cantidad;
    localStorage.setItem('totalCarrito',JSON.stringify(this.totalItems));
  }
  suma(item: any) {
    this.listaItems.forEach(element => {
      if (element.Item._id == item.Item._id) {
        element.Cantidad++;
      }
    });
  }

  resta(item: any) {
    this.listaItems.forEach(element => {
      if (element.Item._id == item.Item._id) {
        if (element.Cantidad == 1) { }
        else {
          element.Cantidad--;
        }
      }
    });
  }
  carritoSalida(){
    console.log(this.cookieValue);
  }
}
