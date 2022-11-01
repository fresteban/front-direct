import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../services/administracion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  errormessage = '';
  errorclass = '';

  constructor(
    private _administracionService: AdministracionService,
    private uF: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.uF.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  obtenerUsuario() {
    if (this.userForm.valid) {
      let usuario = new HttpParams({
        fromObject: {
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('password')?.value,
        },
      });

      this._administracionService.getUsuario(usuario).subscribe(
        (data) => {
          if (data.rol == 'administrador') {
            this.router.navigate(['/admin']);
          }
          else{
            this.router.navigate(['/empleado']);
          }
        },
        (error) => {
          console.log(error);
          this.errormessage = 'Ingese datos válidos';
          this.errorclass = 'errormessage';
        }
      );
    } else {
      this.errormessage = 'Ingese datos válidos';
      this.errorclass = 'errormessage';
    }
  }
}
