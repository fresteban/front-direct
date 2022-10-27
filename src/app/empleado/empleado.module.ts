import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoMainPageComponent } from './empleado-main-page/empleado-main-page.component';
import { MesasComponent } from './mesas/mesas.component';
import { CuentasEsperaComponent } from './cuentas-espera/cuentas-espera.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { MenuEmpleadoComponent } from './menu-empleado/menu-empleado.component';
import { RouterModule } from '@angular/router';
import { CompartidoModule } from '../compartido/compartido.module';



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
    RouterModule,
    CompartidoModule
  ]
})
export class EmpleadoModule { }
