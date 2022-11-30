import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/categoria';

import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private _refreshrequired = new Subject<void>();

  get Refreshrequired(){
    return this._refreshrequired;
  }
  url = 'https://produccion2.herokuapp.com/api/categoria/';

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<any> {
    return this.http.get(this.url)
  }

  obtenerCategoriasTotal(): Observable<any> {
    return this.http.get(this.url + 'categorias');
  }

  eliminarCategoria(id: String): Observable<any> {
    return this.http.delete(this.url + id);
  }

  obtenerSubCategorias(): Observable<any> {
    return this.http.get(this.url + 'subcategorias');
  }

  actualizarCategoria(categoria:Categoria, id:string): Observable<any> {
    return this.http.put(this.url+id, categoria).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
  }
}
