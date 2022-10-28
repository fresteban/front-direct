import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';

//componentes
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';
import { FormularioModificarItemComponent } from './admin/formulario-modificar-item/formulario-modificar-item.component';
import { LoginComponent } from './usuario/login/login.component';
import { EmpleadoMainPageComponent } from './empleado/empleado-main-page/empleado-main-page.component';
import { MesasComponent } from './empleado/mesas/mesas.component';
import { CuentasEsperaComponent } from './empleado/cuentas-espera/cuentas-espera.component';
import { CuentasComponent } from './empleado/cuentas/cuentas.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminMainPageComponent
  },
  {
    path: 'empleado',
    component: EmpleadoMainPageComponent,
    children: [
      {
        path: 'mesas', component: MesasComponent
      },
      {
        path: 'cuentas-espera', component: CuentasEsperaComponent
      },
      {
        path: 'cuentas', component: CuentasComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
