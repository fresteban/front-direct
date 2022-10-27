import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../services/administracion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _administracionService: AdministracionService) { }

  credenciales = '{"email":"correo", "password":"admin123"}';

  usuario = JSON.parse(this.credenciales)

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario(){
    this._administracionService.getUsuario(this.credenciales).subscribe(data =>{
      console.log(data);
    }, error =>{
      console.log(error);
    }
    )
  }

}
