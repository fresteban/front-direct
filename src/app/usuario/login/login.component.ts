import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../services/administracion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  errormessage = '';
  errorclass = '';
  usuario = [];

  constructor(
    private _administracionService: AdministracionService,
    private _authService: AuthService,
    private uF: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.uF.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }




  ngOnInit(): void { }

  iniciarSesion() {
    if(this.userForm.valid){
      console.log(this.usuario);
      this.usuario[0] = this.userForm.get('email')?.value;
      this.usuario[1] = this.userForm.get('password')?.value;
      this._authService.signIn(this.usuario).subscribe(
        res => {
          console.log(res.token);
          localStorage.setItem('token: ', res.token);
          this.router.navigate(['/admin'])
        },
        err => {
          console.log(err);
          this.errormessage = 'Ingese datos válidos';
          this.errorclass = 'errormessage';
        }
      )
    }

    }



  }

  // obtenerUsuario() {
  //   if (this.userForm.valid) {

  //     this._administracionService.getUsuario(this.usuario).subscribe(
  //       (data) => {
  //         if (data.rol == 'administrador') {
  //           this.router.navigate(['/admin']);
  //         }
  //         else{
  //           this.router.navigate(['/empleado']);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.errormessage = 'Ingese datos válidos';
  //         this.errorclass = 'errormessage';
  //       }
  //     );
  //   } else {
  //     this.errormessage = 'Ingese datos válidos';
  //     this.errorclass = 'errormessage';
  //   }
  // }

