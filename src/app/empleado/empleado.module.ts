import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoMainPageComponent } from './empleado-main-page/empleado-main-page.component';
import { MesasComponent } from './mesas/mesas.component';
import { CuentasEsperaComponent } from './cuentas-espera/cuentas-espera.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { MenuEmpleadoComponent } from './menu-empleado/menu-empleado.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EmpleadoMainPageComponent,
    MesasComponent,
    CuentasEsperaComponent,
    CuentasComponent,
    MenuEmpleadoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'cuentas',component:CuentasComponent},
      {path: 'cuentas-espera',component:CuentasEsperaComponent},
      {path: 'menu-empleado',component:MenuEmpleadoComponent},
      {path: 'mesas',component:MesasComponent},
      {path: '**',redirectTo:'/empleado',pathMatch:'full'},
    ]),
  ]
})
export class EmpleadoModule { }
