import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  url = 'https://produccion2.herokuapp.com/api/Administracion/';

  constructor(private http: HttpClient) { }

  getUsuario(credencial: HttpParams): Observable<any> {
    return this.http.get(this.url, {params: credencial})
  }
}
