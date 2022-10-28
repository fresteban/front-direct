import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';

//componentes
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';
import { FormularioModificarItemComponent } from './admin/formulario-modificar-item/formulario-modificar-item.component';
import { LoginComponent } from './usuario/login/login.component';
import { EmpleadoMainPageComponent } from './empleado/empleado-main-page/empleado-main-page.component';
import { CuentasComponent } from './empleado/cuentas/cuentas.component';
import { CuentasEsperaComponent } from './empleado/cuentas-espera/cuentas-espera.component';
import { MesasComponent } from './empleado/mesas/mesas.component';
import { MenuEmpleadoComponent } from './empleado/menu-empleado/menu-empleado.component';

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
    path: 'admin/:idItem',
    component: FormularioModificarItemComponent
  },
  {
    path: 'mesero',
    component: EmpleadoMainPageComponent
  },
  {
    path: 'mesero/cuentas',
    component: CuentasComponent
  },
  {
    path: 'mesero/cuentas-espera',
    component: CuentasEsperaComponent
  },
  {
    path: 'mesero/mesas',
    component: MesasComponent
  },
  {
    path: 'mesero/menu-empleado',
    component: MenuEmpleadoComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
