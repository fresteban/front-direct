import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _refreshrequired = new Subject<void>();

  get Refreshrequired(){
    return this._refreshrequired;
  }

  url = 'https://localhost:3000/api/Item/';

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(this.url);
  }

  guardarItem(item: Item): Observable<any> {
    return this.http.post(this.url, item).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
  }

  eliminarItem(id: String): Observable<any> {
    return this.http.delete(this.url + id);
  }

  obtenerItem(id: String): Observable<any> {
    return this.http.get(this.url + id);
  }

  obtenerSubCategorias(): Observable<any> {
    return this.http.get(this.url + 'subcategorias');
  }

  actualizarItem(item:Item, id:string): Observable<any> {
    return this.http.put(this.url+id, item).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
  }
}
