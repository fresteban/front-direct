import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { ItemTableComponent } from './item-table/item-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioAgregarItemComponent } from './formularioAgregarItem/formularioAgregarItem.component';
import { FormularioModificarItemComponent } from './formulario-modificar-item/formulario-modificar-item.component';
import { RouterModule } from '@angular/router';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { ItemEliminadosComponent } from './item-eliminados/item-eliminados.component';
import { VistaCategoriasComponent } from './vista-categorias/vista-categorias.component';
import { LoginComponent } from '../usuario/login/login.component';
@NgModule({
  declarations: [
    AdminMainPageComponent,
    ItemTableComponent,
    FormularioAgregarItemComponent,
    FormularioModificarItemComponent,
    ModalItemComponent,
    ItemEliminadosComponent,
    VistaCategoriasComponent,
    LoginComponent
  ],
  exports: [
    AdminMainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AdminModule { }
