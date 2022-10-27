import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../services/administracion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  constructor(private _administracionService: AdministracionService, private uF: FormBuilder) {
    this.userForm = this.uF.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
   }

  email: string = 'amandaflores@outlook.cl';
  password: string = 'admin123';

  ngOnInit(): void {
  }

  obtenerUsuario(){
    console.log(this.userForm);
    let usuario = new HttpParams({
      fromObject: {'email':this.userForm.get('email')?.value, 'password':this.userForm.get('password')?.value}
    });
    console.log(usuario);
    this._administracionService.getUsuario(usuario).subscribe(data =>{
      console.log(data);
    }, error =>{
      console.log(error);
    }
    )
  }

}
