import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { ItemTableComponent } from './item-table/item-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminMainPageComponent,
    ItemTableComponent
  ],
  exports: [
    AdminMainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
