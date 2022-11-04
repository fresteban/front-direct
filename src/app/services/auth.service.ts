import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4000/api/administracion'

  constructor(private http: HttpClient, private router: Router) { }

  signIn(usuario) {
    return this.http.post<any>(this.URL + '/login', usuario);
  }

  loggedIn(){
    return !!(localStorage.getItem('token: '))
  }

  getToken(){
    return localStorage.getItem('token: ');
  }

  logout(){
    localStorage.removeItem('token: ');
    this.router.navigate(['/login']);
  }
}
