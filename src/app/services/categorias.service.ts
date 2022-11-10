import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/categoria';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  url = 'http://localhost:4000/api/categoria/';

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<any> {
    return this.http.get(this.url)
  }

  obtenerCategoriasTotal(): Observable<any> {
    return this.http.get(this.url + 'categorias');
  }
}
