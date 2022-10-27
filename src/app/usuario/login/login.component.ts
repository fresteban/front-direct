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
    private uF: FormBuilder
  ) {
    this.userForm = this.uF.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  obtenerUsuario() {
    console.log(this.userForm);
    if (this.userForm.valid) {
      let usuario = new HttpParams({
        fromObject: {
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('password')?.value,
        },
      });
      console.log(usuario);

      this._administracionService.getUsuario(usuario).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.errormessage = 'Ingese datos validossss';
          this.errorclass = 'errormessage';
        }
      );
    } else {
      this.errormessage = 'Ingese datos validos';
      this.errorclass = 'errormessage';
    }
  }
}
