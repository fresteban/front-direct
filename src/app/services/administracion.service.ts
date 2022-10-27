import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  url = 'http://localhost:4000/api/Administracion/';

  constructor(private http: HttpClient) { }

  getUsuario(credencial: any): Observable<any> {
    console.log(credencial);
    return this.http.get(this.url, credencial)
  }
}
