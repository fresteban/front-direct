import { CarritoComponent } from './cliente/carrito/carrito.component';
import { VistaCategoriasComponent } from './admin/vista-categorias/vista-categorias.component';
import { ItemTableComponent } from './admin/item-table/item-table.component';
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
import { ItemEliminadosComponent } from './admin/item-eliminados/item-eliminados.component';
import { CartaComponent } from './cliente/carta/carta.component';
import { MenuEmpleadoComponent } from './empleado/menu-empleado/menu-empleado.component';
import { AuthGuard } from './services/auth.guard';
import { ErrorComponent } from './compartido/error/error.component';
import { CocinaModule } from './cocina/cocina.module';
import { PantallaComponent } from './cocina/pantalla/pantalla.component';

const routes: Routes = [
  {
    path: 'carta/:mesa',
    component: CartaComponent,
    children: [
      {
        path: 'Carta',
        component: CartaComponent
      }]
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'admin',
    component: AdminMainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'items', component: ItemTableComponent
      },
      {
        path: 'categorias', component: VistaCategoriasComponent
      },
      {
        path: 'eliminados', component: ItemEliminadosComponent
      },
    ]
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
      {
        path: 'menu-empleado', component:MenuEmpleadoComponent
      }
    ]
  },
  {
    path: 'cocina',
    component: PantallaComponent
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
