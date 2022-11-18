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
  selector: 'app-menu-empleado',
  templateUrl: './menu-empleado.component.html',
  styleUrls: ['./menu-empleado.component.scss']
})
export class MenuEmpleadoComponent implements OnInit {
  listaItems: any[] = [];
  cat: Categoria[] = [];
  codeTable: String;
  mesaId: Number;
  carro: Carro;
  public cookieValue: any[] = [];
  indexCantidad: number[] = [];
  public totalItems: number = 0;

  constructor(private _itemService: ItemService, private _categoriaService: CategoriasService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cargarCategorias();
    this.obtenerItems();

  }

  cargarCategorias() {
    this._categoriaService.obtenerCategorias().subscribe(data => {
      this.cat = data;
      this.cat.forEach(categoria => {
        categoria.subcategoria.sort();
      });
    })
  }

  obtenerItems() {
    this._itemService.getItems().subscribe(data => {
      for(let i = 0; i<this.cat.length;i++){
        data.forEach(element => {
          if(element.categoria==this.cat[i].categoria)
          this.listaItems.push(element);
        });
      }

    }, error => {
      console.log(error);
    })
  }

}
