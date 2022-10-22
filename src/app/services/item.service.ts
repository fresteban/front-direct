import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = 'http://localhost:4000/api/Item/';

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(this.url);
  }

  guardarItem(item: Item): Observable<any> {
    return this.http.post(this.url, item);
  }

  eliminarItem(id: String): Observable<any> {
    console.log('siuuuu');
    console.log(id);
    return this.http.delete(this.url + id);
  }

  obtenerItem(id: String): Observable<any> {
    return this.http.get(this.url + id);
  }

  obtenerSubCategorias(): Observable<any> {
    return this.http.get(this.url + 'subcategorias');
  }
}
