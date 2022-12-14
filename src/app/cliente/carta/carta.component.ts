import { Categoria } from '../../interfaces/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/interfaces/item';
import { CarroService } from 'src/app/services/carro.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router"
import { Carro } from 'src/app/interfaces/carro';
import { CookieService } from 'ngx-cookie-service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {
  listaItems: any[] = [];
  cat: Categoria[] = [];
  codeTable: String;
  mesaId: Number;
  carro: Carro;
  public cookieValue: any[] = [];
  indexCantidad: number[] = [];
  public totalItems: number = 0;

  constructor(private _itemService: ItemService, private _carroService: CarroService, private _categoriaService: CategoriasService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private cookie: CookieService) { }

  ngOnInit(): void {
    //Se llaman a las Funciones
    this.obtenerItems();
    this.cargarCategorias();
    this.route.params.subscribe(mesa => { this.codeTable = mesa['mesa'] });
    this.decode(this.codeTable)

    localStorage.setItem('mesa', JSON.stringify(this.mesaId));

    //Se verifica si el carrito esta vacio
    if (localStorage.getItem('carrito') != undefined || localStorage.getItem('carrito') != null) {
      this.cookieValue = JSON.parse(localStorage.getItem('carrito'));
    }
    else {
      localStorage.setItem('carrito', JSON.stringify(this.cookieValue))
    }
    if (localStorage.getItem('totalCarrito') != undefined || localStorage.getItem('totalCarrito') != null) {
      this.totalItems = JSON.parse(localStorage.getItem('totalCarrito'));
    }
  }

//Mapa de codigos que estan asociados a cada mesa
  decode(code: String) {
    let mesas = new Map()
    mesas.set('i', 1);
    mesas.set('iy', 2);
    mesas.set('iyj', 3);
    mesas.set('iw', 4);
    mesas.set('w', 5);
    mesas.set('wi', 6);
    mesas.set('wii', 7);
    mesas.set('wiii', 8);
    mesas.set('n', 9);
    mesas.set('x', 10);

    if (mesas.has(code)){
      this.mesaId = mesas.get(code);
    }
    else {
      this.router.navigate(['/error']);
    }
  }

  //Funcion cargarCategorias() permite cargar las categorias existentes
  cargarCategorias() {
    this._categoriaService.obtenerCategorias().subscribe(data => {
      this.cat = data;
      this.cat.forEach(categoria => {
        categoria.subcategoria.sort();
      });
    })
  }

//Funcion obtenerItems() funcion para obtener items existentes 
  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      data.forEach(element => {
        var feed = { Item: element, Cantidad: 1 }
        this.listaItems.push(feed);
      });
    }, error => {
      console.log(error);
    })
  }

//Funcion AgregarCarro() para agregar items al carro de compras
// Sugerencia Cambiar nombre de la funci??n por algo mas representativo ej: agregarItemCarro()
  agregarCarro(item: any) {
    let itemsCarro = []
    itemsCarro = JSON.parse(localStorage.getItem('carrito'));
    let value = null
    if (itemsCarro){
      value = itemsCarro.find(element => element.Item._id == item.Item._id);
    }
    if (value) {
      let cantidad = itemsCarro.find(element => element.Item._id == item.Item._id).Cantidad
      itemsCarro.find(element => element.Item._id == item.Item._id).Cantidad = cantidad + item.Cantidad;
      this.cookieValue = itemsCarro;
      localStorage.setItem('carrito', JSON.stringify(this.cookieValue))
    }
    else{
      this.cookieValue.push(item);
      localStorage.setItem('carrito', JSON.stringify(this.cookieValue));
    }
    this.toastr.success('Item agregado a la cesta')
    this.totalItems += item.Cantidad;
    localStorage.setItem('totalCarrito', JSON.stringify(this.totalItems));
  }

//Funci??n suma() para sumar items
//Sugerencia: Colocar un nombre m??s representativo ej: sumarItemsSeleccionado()
  suma(item: any) {
    this.listaItems.forEach(element => {
      if (element.Item._id == item.Item._id) {
        element.Cantidad++;
      }
    });
  }

//Funci??n resta() para restar items
//Sugerencia: Colocar un nombre m??s representativo ej: restarItemsSeleccionado()
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

//Funcion carritoSalida() (NO SE UTILIZA)
  carritoSalida() {
    //console.log(this.cookieValue);
  }
}
