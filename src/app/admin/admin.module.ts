import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { ItemTableComponent } from './item-table/item-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioAgregarItemComponent } from './formularioAgregarItem/formularioAgregarItem.component';
import { FormularioModificarItemComponent } from './formulario-modificar-item/formulario-modificar-item.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AdminMainPageComponent,
    ItemTableComponent,
    FormularioAgregarItemComponent,
    FormularioModificarItemComponent
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
